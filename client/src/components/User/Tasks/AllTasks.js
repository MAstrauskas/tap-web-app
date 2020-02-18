import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import TaskTable from "../../shared/Table/Table";
import UndoMessage from "../../shared/Table/UndoMessage";
import WarningMessage from "../../shared/Table/WarningMessage";

export default class AllTasks extends Component {
  state = {
    isFetching: false,
    tasks: [],
    editSuccessful: false,
    open: false,
    openWarning: false,
    taskId: "",
    taskName: ""
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

    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({ tasks: [...res.data.tasks] });
      });
  };

  /* istanbul ignore next */
  handleComplete = async (isOpen, taskId) => {
    await axios
      .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
      .then(res => {
        this.setState({
          tasks: [...res.data.tasks],
          open: isOpen,
          taskId: taskId
        });
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    this.setState({ open: false });
  };

  /* istanbul ignore next */
  handleUndo = async taskId => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.state.taskId,
        isTaskComplete: false,
        taskUpdateDate: taskUpdateDate
      };

      await axios.patch(`http://localhost:9000/api/tasks/completed`, body).then(
        response => {
          this.setState({ open: false });
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

      await axios
        .get(`http://localhost:9000/api/tasks/${this.props.userEmail}`)
        .then(res => {
          this.setState({ tasks: [...res.data.tasks] });
        });
    } catch (e) {
      console.log(e);
    }
  };

  handleWarningClick = async (taskId, taskName) => {
    await this.setState({
      openWarning: true,
      taskId: taskId,
      taskName: taskName
    });
  };

  handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openWarning: false });
  };

  componentDidMount() {
    this.handleTasks();
  }

  render() {
    const { tasks, open, openWarning, taskName, taskId } = this.state;

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
      <>
        <TaskTable
          tasks={filteredTasks}
          title="All Tasks"
          headers={headers}
          isTaskDescription={true}
          isTaskDifficulty={true}
          isEdit={true}
          isDelete={true}
          handleComplete={this.handleComplete}
          handleWarningClick={this.handleWarningClick}
        />
        <div>
          <UndoMessage
            open={open}
            handleClose={this.handleClose}
            handleUndo={this.handleUndo}
          />
          <WarningMessage
            open={openWarning}
            task={taskName}
            taskId={taskId}
            handleDelete={this.handleDelete}
            handleClose={this.handleWarningClose}
          />
        </div>
      </>
    );
  }
}
