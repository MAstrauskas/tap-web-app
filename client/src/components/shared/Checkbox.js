import React, { Component } from "react";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

export default class TaskCheckbox extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }
  state = {
    editSuccessful: false,
    checked: false
  };

  handleEdit = async () => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        id: this.props.id,
        isTaskComplete: true,
        taskUpdateDate: taskUpdateDate
      };

      await axios.patch(`http://localhost:9000/api/tasks/completed`, body).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

      this.setState(prevState => ({
        ...prevState,
        editSuccessful: true,
        checked: true
      }));

      setTimeout(async () => {
        await this.props.handleComplete(true, this.props.id);
      }, 100);
    } catch (e) {
      console.log(e);

      this.setState(prevState => ({
        ...prevState,
        editSuccessful: false,
        checked: false
      }));
    }
  };

  render() {
    const { checked } = this.state;

    return (
      <div>
        <Checkbox
          data-testid="Checkbox"
          checked={checked}
          onChange={this.handleEdit}
          value="primary"
          inputProps={{ "aria-label": "make task complete" }}
        />
      </div>
    );
  }
}
