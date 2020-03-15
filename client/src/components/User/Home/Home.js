import React, { Component } from "react";
import axios from "axios";
import Media from "react-media";

import TaskTable from "../../shared/Table/Table";
import MobileTable from "../../shared/Table/MobileTable";
import UndoMessage from "../../shared/Table/UndoMessage";
import WarningMessage from "../../shared/Table/WarningMessage";
import MobileAddButtons from "../../shared/MobileAddButtons";

export default class Home extends Component {
  state = {
    isFetching: false,
    tasks: [],
    open: false,
    openWarning: false,
    taskName: "",
    taskId: "",
    isTaskSuggested: false
  };

  handleTasks = async () => {
    this.setState({ ...this.state, isFetching: true });

    await axios.get(`/api/tasks/${this.props.userEmail}`).then(res => {
      this.setState({
        tasks: [
          ...this.state.tasks.filter(task => !task.isTaskComplete),
          ...res.data.tasks
        ]
      });
    });

    this.setState({ ...this.state, isFetching: false });
  };

  /* istanbul ignore next */
  handleDelete = async taskId => {
    await axios.delete(`/api/tasks/delete/${taskId}`).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    await axios.get(`/api/tasks/${this.props.userEmail}`).then(res => {
      this.setState({ tasks: [...res.data.tasks] });
    });
  };

  /* istanbul ignore next */
  handleComplete = async (isOpen, taskId, isTaskSuggested) => {
    await axios.get(`/api/tasks/${this.props.userEmail}`).then(res => {
      this.setState({
        tasks: [...res.data.tasks],
        open: isOpen,
        taskId: taskId,
        isTaskSuggested: isTaskSuggested
      });
    });
  };

  handleWarningClick = (taskId, taskName) => {
    this.setState({
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    this.setState({ open: false });
  };

  /* istanbul ignore next */
  handleUndo = async () => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.state.taskId,
        isTaskComplete: false,
        isTaskSuggested: !this.state.isTaskSuggested,
        taskUpdateDate: taskUpdateDate
      };

      await axios.patch(`/api/tasks/completed`, body).then(
        response => {
          this.setState({ open: false });
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

      await axios.get(`/api/tasks/${this.props.userEmail}`).then(res => {
        this.setState({ tasks: [...res.data.tasks] });
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.handleTasks();
  }

  render() {
    const { tasks, open, openWarning, taskName, taskId } = this.state;

    const allUncompletedTasks = tasks.filter(task => !task.isTaskComplete);
    const suggestedTasks = tasks
      .filter(task => task.isTaskSuggested && !task.isTaskComplete)
      .sort((a, b) => {
        const taskOne = a.taskPriority;
        const taskTwo = b.taskPriority;

        // Sort by Task Priority
        if (
          (taskOne === "High" && taskTwo === "High") ||
          (taskOne === "Medium" && taskTwo === "Medium") ||
          (taskOne === "Low" && taskTwo === "Low")
        )
          return 0;

        if (taskOne === "High" && taskTwo === "Medium") return -1;
        if (taskOne === "High" && taskTwo === "Low") return -1;
        if (taskOne === "Medium" && taskTwo === "High") return 1;
        if (taskOne === "Medium" && taskTwo === "Low") return -1;
        if (taskOne === "Low" && taskTwo === "High") return 1;
        if (taskOne === "Low" && taskTwo === "Medium") return 1;
      });

    const headers = ["Task", "Due Date", "Priority"];

    return (
      <div>
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
                    tasks={suggestedTasks}
                    title="Suggested Tasks"
                    isEdit={true}
                    isDelete={true}
                    handleComplete={this.handleComplete}
                    handleWarningClick={this.handleWarningClick}
                    marginBottom="2rem"
                    isSuggestedTable={true}
                    allTasks={allUncompletedTasks}
                  />

                  <MobileAddButtons />
                </>
              )}

              {matches.large && (
                <TaskTable
                  tasks={suggestedTasks}
                  title="Suggested Tasks"
                  headers={headers}
                  isTaskDescription={false}
                  isTaskDifficulty={false}
                  isEdit={true}
                  isDelete={true}
                  handleComplete={this.handleComplete}
                  handleWarningClick={this.handleWarningClick}
                  marginBottom="2rem"
                  isSuggestedTable={true}
                  allTasks={allUncompletedTasks}
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
      </div>
    );
  }
}
