import React, { Component } from "react";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

export default class TaskCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editSuccessful: false,
      checked: false,
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  /* istanbul ignore next */
  handleEdit = async () => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.props.id,
        isTaskComplete: true,
        isTaskSuggested: !this.props.isTaskSuggested,
        taskUpdateDate: taskUpdateDate,
      };

      await axios
        .patch(`/api/tasks/completed`, body, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(
          () => {
            console.log("Task completed.");
          },
          (error) => {
            console.log("Error occurred while making a task completed.", error);
          }
        );

      this.setState((prevState) => ({
        ...prevState,
        editSuccessful: true,
        checked: true,
      }));

      setTimeout(async () => {
        await this.props.handleComplete(
          true,
          this.props.id,
          !this.props.isTaskSuggested
        );
      }, 100);
    } catch (e) {
      console.log(e);

      this.setState((prevState) => ({
        ...prevState,
        editSuccessful: false,
        checked: false,
      }));
    }
  };

  render() {
    const { checked } = this.state;

    return (
      <div>
        <Checkbox
          checked={checked}
          onChange={this.handleEdit}
          value="primary"
          inputProps={{
            "aria-label": "make task complete",
            "data-testid": "make-task-complete",
          }}
        />
      </div>
    );
  }
}
