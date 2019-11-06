import React, { Component } from "react";
import axios from "axios";
import { Formik } from "formik";
import { Redirect } from "react-router";

export class AddTask extends Component {
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { taskDueDate } = values;
      const taskDueDateTimestamp = Date.parse(taskDueDate);
      const taskCreateDate = Date.now();
      const body = {
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        taskCreateDate,
        taskDueDate: taskDueDateTimestamp,
        taskPriority: values.taskPriority,
        taskDifficulty: values.taskDifficulty,
        isTaskComplete: values.isTaskComplete,
        isTaskSuggested: values.isTaskSuggested
      };

      setSubmitting(true);

      await axios.post("http://localhost:9000/api/tasks/add", body).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

      setSubmitting(false);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            taskName: "",
            taskDescription: "",
            taskCreateDate: Date.now(),
            taskDueDate: null,
            taskPriority: "",
            taskDifficulty: "",
            isTaskComplete: false,
            isTaskSuggested: false
          }}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit
            } = props;

            return (
              <form onSubmit={handleSubmit} data-testid="add-task-form">
                <h2>Add a Task</h2>

                <div>
                  <label for="taskName">Name</label>
                  <input
                    type="text"
                    name="taskName"
                    placeholder="Enter a task..."
                    value={values.taskName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label for="taskDescription">Description</label>
                  <input
                    type="textarea"
                    name="taskDescription"
                    placeholder="Enter a description..."
                    value={values.taskDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label for="taskDueDate">Due Date</label>
                  <input
                    type="date"
                    name="taskDueDate"
                    value={values.taskDueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label for="taskPriority">Priority</label>
                  <select
                    name="taskPriority"
                    value={values.taskPriority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected>Select...</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label for="taskDifficulty">Difficulty</label>
                  <select
                    name="taskDifficulty"
                    value={values.taskDifficulty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected>Select...</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default AddTask;
