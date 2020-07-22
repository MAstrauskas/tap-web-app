import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Media from "react-media";
import TaskTable from "../../shared/Table/Table";
import MobileTable from "../../shared/Table/MobileTable";
import UndoMessage from "../../shared/Table/UndoMessage";
import WarningMessage from "../../shared/Table/WarningMessage";
import MobileAddButtons from "../../shared/MobileAddButtons";

export const sortByDate = (tasks) => {
  return tasks
    .sort((a, b) => {
      const dueDate = moment(a.taskDueDate).format("YYYY-MM-DD HH:mm:ss");
      const dueDate2 = moment(b.taskDueDate).format("YYYY-MM-DD HH:mm:ss");

      if (dueDate > dueDate2) return 1;
      else return -1;
    })
    .filter((task) => !task.isTaskComplete);
};

export default class AllTasks extends Component {
  state = {
    isFetching: false,
    tasks: [],
    editSuccessful: false,
    open: false,
    openWarning: false,
    taskId: "",
    taskName: "",
  };

  handleTasks = async () => {
    this.setState({ ...this.state, isFetching: true });

    await axios
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
      });

    this.setState({ ...this.state, isFetching: false });
  };

  handleDelete = async (taskId) => {
    await axios
      .delete(`/api/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then(
        () => {
          console.log("Task deleted.");
        },
        (error) => {
          console.log("Error occured deleting task.", error);
        }
      );

    await axios
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        this.setState({ tasks: [...res.data.tasks] });
      });
  };

  handleComplete = async (isOpen, taskId, isTaskSuggested) => {
    await axios
      .get(`/api/tasks/${this.props.userEmail}`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        this.setState({
          tasks: [...res.data.tasks],
          open: isOpen,
          taskId: taskId,
          isTaskSuggested: isTaskSuggested,
        });
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    this.setState({ open: false });
  };

  handleUndo = async () => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.state.taskId,
        isTaskComplete: false,
        isTaskSuggested: !this.state.isTaskSuggested,
        taskUpdateDate: taskUpdateDate,
      };

      await axios
        .patch(`/api/tasks/completed`, body, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(
          () => {
            this.setState({ open: false });
            console.log("Task completed.");
          },
          (error) => {
            console.log("Error occured making task complete", error);
          }
        );

      await axios
        .get(`/api/tasks/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
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
      taskName: taskName,
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
    const filteredTasks = sortByDate(tasks);

    const headers = [
      "Task",
      "Description",
      "Due Date",
      "Priority",
      "Difficulty",
    ];

    return (
      <>
        <Media
          queries={{
            small: "(max-width: 800px)",
            large: "(min-width: 801px)",
          }}
        >
          {(matches) => (
            <div data-testid="all-tasks-table">
              {matches.small && (
                <div data-testid="mobile-view">
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
                </div>
              )}

              {matches.large && (
                <div data-testid="desktop-view">
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
                </div>
              )}
            </div>
          )}
        </Media>

        <div data-testid="action-messages">
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
