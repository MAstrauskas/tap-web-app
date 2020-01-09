import React, { Component } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  MdEdit as EditIcon,
  MdDeleteForever as DeleteIcon
} from "react-icons/md";

import Theme from "../../shared/Theme/Theme";
import Checkbox from "../../shared/Checkbox";

const Table = styled.table`
  display: flex;
  height: calc(100vh - 200px);
  width: 100%;
  border-spacing: 0px !important;

  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
`;

const TableBody = styled.tbody`
  width: 100%;
  border-radius: 9px;

  tr:nth-child(even) {
    background-color: ${Theme.colors.secondary};
  }
`;

const TableHeader = styled.th`
  width: 100%;
  padding: 1rem 0.5rem 1rem 0.5rem;
  font-size: ${Theme.fontSize.xsmall};
  background: ${Theme.colors.primary};
  color: ${Theme.colors.white};

  :first-child {
    border-top-left-radius: 6px;
  }

  :last-child {
    border-top-right-radius: 6px;
    border-right: 1px solid ${Theme.colors.primary};
  }
`;

const TableContent = styled.td`
  width: 100%;

  padding: 0.5rem;
  border-right: 0px;
  border-top: 0px;

  :first-child {
    border-left: 0px;
  }

  :last-child {
    border-right: 0px;
    text-align: center;
  }
`;

const TableButton = styled.button`
  border: 0px;
  background: transparent;
  transition: color 0.3s ease;
  cursor: pointer;

  :hover {
    color: ${Theme.colors.activeLink};
  }

  svg {
    width: 17px;
    height: 17px;
  }
`;

const TaskName = styled.span`
  margin-left: 10px;
`;

export default class Home extends Component {
  state = {
    isFetching: false,
    tasks: []
  };

  handleTasks = async () => {
    this.setState({ ...this.state, isFetching: true });

    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({
        tasks: [
          ...this.state.tasks.filter(task => !task.isTaskComplete),
          ...res.data.tasks
        ]
      });
    });

    this.setState({ ...this.state, isFetching: false });
  };

  handleDelete = async taskId => {
    await axios.delete(`http://localhost:9000/api/tasks/delete/${taskId}`).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    this.setState({ tasks: [] });

    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
    });
  };

  handleComplete = async () => {
    this.setState({ tasks: [] });

    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
    });
  };

  handleUserRegistration = async () => {
    this.setState({ ...this.state, isFetching: true });

    const body = {
      name: this.props.name,
      email: this.props.email
    };

    await axios
      .post("http://localhost:9000/api/user/add", body)
      .then(res => console.log(res))
      .catch(e => console.log(e));

    this.setState({ ...this.state, isFetching: false });
  };

  componentDidMount() {
    this.handleTasks();
    this.handleUserRegistration();
  }

  render() {
    const { tasks } = this.state;
    console.log(this.props.email);
    return (
      <>
        <h1>Today's tasks</h1>

        {this.state.isFetching ? (
          <h2>Loading...</h2>
        ) : (
          <Table data-testid="table">
            <TableBody>
              <tr>
                <TableHeader>Task</TableHeader>
                <TableHeader>Due Date</TableHeader>
                <TableHeader>Edit</TableHeader>
                <TableHeader>Delete</TableHeader>
              </tr>
              {tasks
                .filter(task => {
                  const dueDate = new Date(task.taskDueDate);
                  const todaysDate = new Date();

                  return (
                    dueDate.setHours(0, 0, 0, 0) ===
                      todaysDate.setHours(0, 0, 0, 0) && !task.isTaskComplete
                  );
                })
                .map(task => {
                  const dueDate = moment(task.taskDueDate).format("LL");

                  return (
                    <tr disabled={task.isTaskComplete}>
                      <TableContent>
                        <Checkbox
                          id={task._id}
                          handleComplete={this.handleComplete}
                        />
                        <TaskName>{task.taskName}</TaskName>
                      </TableContent>
                      <TableContent>{dueDate}</TableContent>
                      <TableContent>
                        <Link
                          to={{
                            pathname: "/tasks/edit",
                            state: {
                              task: task
                            }
                          }}
                        >
                          <TableButton>
                            <EditIcon />
                          </TableButton>
                        </Link>
                      </TableContent>
                      <TableContent>
                        <TableButton
                          onClick={() => this.handleDelete(task._id)}
                        >
                          <DeleteIcon />
                        </TableButton>
                      </TableContent>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </>
    );
  }
}
