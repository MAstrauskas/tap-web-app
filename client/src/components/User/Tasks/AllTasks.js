import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Media from "react-media";

import TaskTable from "../../shared/Table/Table";
import MobileTable from "../../shared/Table/MobileTable";
import UndoMessage from "../../shared/Table/UndoMessage";
import WarningMessage from "../../shared/Table/WarningMessage";
import MobileAddButtons from "../../shared/MobileAddButtons";

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
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(res => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });

    this.setState({ ...this.state, isFetching: false });
  };

  /* istanbul ignore next */
  handleDelete = async taskId => {
    await axios
      .delete(`/api/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    await axios
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(res => {
        this.setState({ tasks: [...res.data.tasks] });
      });
  };

  /* istanbul ignore next */
  handleComplete = async (isOpen, taskId, isTaskSuggested) => {
    await axios
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(res => {
        this.setState({
          tasks: [...res.data.tasks],
          open: isOpen,
          taskId: taskId,
          isTaskSuggested: isTaskSuggested
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
        isTaskSuggested: !this.state.isTaskSuggested,
        taskUpdateDate: taskUpdateDate
      };

      await axios
        .patch(`/api/tasks/completed`, body, {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then(
          response => {
            this.setState({ open: false });
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );

      await axios
        .get(`/api/tasks/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
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
        const dueDate = moment(a.taskDueDate).format("YYYY-MM-DD HH:mm:ss");
        const dueDate2 = moment(b.taskDueDate).format("YYYY-MM-DD HH:mm:ss");

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
        <Media
          queries={{
            small: "(max-width: 800px)",
            large: "(min-width: 801px)"
          }}
        >
          {matches => (
            <div>
              {matches.small && (
                <>
                  <MobileTable
                    tasks={filteredTasks}
                    title="All Tasks"
                    isEdit={true}
                    isDelete={true}
                    handleComplete={this.handleComplete}
                    handleWarningClick={this.handleWarningClick}
                    isSuggestedTable={false}
                    token={this.props.token}
                  />

                  <MobileAddButtons />
                </>
              )}

              {matches.large && (
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
                  isSuggestedTable={false}
                  token={this.props.token}
                />
              )}
            </div>
          )}
        </Media>

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
