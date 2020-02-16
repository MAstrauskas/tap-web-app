import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import TaskTable from "../../shared/Table/Table";

export default class AllTasks extends Component {
  state = {
    isFetching: false,
    tasks: []
  };

  /* istanbul ignore next */
  handleTasks = async () => {
    this.setState({ ...this.state, isFetching: true });

    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });

    this.setState({ ...this.state, isFetching: false });
  };

  /* istanbul ignore next */
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

    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });
  };

  /* istanbul ignore next */
  handleComplete = async () => {
    this.setState({ tasks: [] });

    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });
  };

  componentDidMount() {
    this.handleTasks();
  }

  render() {
    const { tasks } = this.state;

    // Sort by date and not include finished tasks
    const filteredTasks = tasks
      .sort((a, b) => {
        const dueDate = moment(a.taskDueDate).format("LL");
        const dueDate2 = moment(b.taskDueDate).format("LL");

        if (dueDate > dueDate2) return 1;
        else return -1;
      })
      .filter(task => !task.isTaskComplete);

    const headers = [
      "Task",
      "Description",
      "Due Date",
      "Priority",
      "Difficulty"
    ];

    return (
      <TaskTable
        tasks={filteredTasks}
        title="All Tasks"
        headers={headers}
        isTaskDescription={true}
        isEdit={true}
        isDelete={true}
        handleComplete={this.handleComplete}
        handleDelete={this.handleDelete}
      />
    );
  }
}
