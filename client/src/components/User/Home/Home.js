import React, { Component } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import moment from "moment";

export default class Home extends Component {
  state = {
    tasks: []
  };

  handleTasks = async () => {
    await axios.get("http://localhost:9000/api/tasks").then(res => {
      this.setState({ tasks: [...this.state.tasks, ...res.data.tasks] });
    });
  };

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <h1>Your added tasks:</h1>
        <div>
          {tasks.map(task => {
            const createDate = moment(task.taskCreateDate).format("DD/MM/YYYY");
            const dueDate = moment(task.taskDueDate).format("DD/MM/YYYY");
            return (
              <div style={{ border: `1px solid black` }}>
                <p>Name: {task.taskName}</p>
                <p>Description: {task.taskDescription}</p>
                <p>Created: {createDate}</p>
                <p>Due Date: {dueDate}</p>
                <p>Priority: {task.taskPriority}</p>
                <p>Difficulty: {task.taskDifficulty}</p>
                <p>Completed: {task.isTaskComplete.toString()}</p>
                <p>Suggested: {task.isTaskSuggested.toString()}</p>
              </div>
            );
          })}
        </div>
        <div>
          <button onClick={this.handleTasks}>Show My Tasks</button>
        </div>
      </div>
    );
  }
}
