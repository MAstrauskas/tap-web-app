import React, { Component } from "react";
import axios from "axios";
import { Formik, Field } from "formik";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

import Theme from "../../shared/Theme/Theme";
import moment from "moment";
import * as Yup from "yup";

const CustomForm = styled.div`
  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
  form {
    padding: 0rem 8rem;
  }
`;

const Title = styled.h1`
  font-size: ${Theme.fontSize.xlarge};
`;

const Form = styled.div`
  padding: 0;
  margin: 2rem -5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: ${Theme.fontSize.medium};
    font-weight: bold;
  }

  input,
  select {
    height: 2rem;
    font-size: ${Theme.fontSize.xsmall};
    background: #ffffff;
    mix-blend-mode: normal;
    border: 1px solid ${Theme.colors.primary};
    box-sizing: border-box;
    border-radius: 9px;
    padding-left: 0.5rem;
  }
`;

const FormDescription = styled.div`
  display: flex;
  flex-direction: column;

  label {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: ${Theme.fontSize.medium};
    font-weight: bold;
  }

  textarea {
    background: #ffffff;
    font-size: ${Theme.fontSize.xsmall};
    mix-blend-mode: normal;
    border: 1px solid ${Theme.colors.primary};
    box-sizing: border-box;
    border-radius: 9px;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
  }
`;

const Button = styled.button`
  width: 157px;
  height: 37px;
  background: ${Theme.colors.primary};
  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
  font-size: 16px;
  line-height: 18px;
  color: ${Theme.colors.white};
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

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
    // Set Date to yesterday for validation
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const taskSchema = Yup.object().shape({
      taskName: Yup.string()
        .min(2, "Task Name is too short.")
        .max(30, "Task Name is too long.")
        .required("Task Name is required."),
      taskDescription: Yup.string()
        .min(1, "Task Description is too short.")
        .max(150, "Task Description is too long."),
      taskDueDate: Yup.date().min(
        moment(currentDate),
        "Task Due Date cannot be in the past."
      ),
      taskPriority: Yup.string(),
      taskDifficulty: Yup.string(),
      isTaskComplete: Yup.boolean(),
      isTaskSuggested: Yup.boolean()
    });
    return (
      <CustomForm>
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
          validationSchema={taskSchema}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            } = props;

            return (
              <form onSubmit={handleSubmit} data-testid="add-task-form">
                <Title>Add a Task</Title>

                <Form>
                  <FormGroup>
                    <label htmlFor="taskName">Name</label>
                    <Field
                      type="text"
                      name="taskName"
                      placeholder="Enter a task..."
                      value={values.taskName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormDescription>
                    <label htmlFor="taskDescription">Description</label>
                    <Field
                      as="textarea"
                      name="taskDescription"
                      rows="5"
                      placeholder="Enter a description..."
                      value={values.taskDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormDescription>
                  <FormGroup>
                    <label htmlFor="taskDueDate">Due Date</label>
                    <Field
                      type="date"
                      name="taskDueDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="taskPriority">Priority</label>
                    <Field
                      as="select"
                      name="taskPriority"
                      value={values.taskPriority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Field>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="taskDifficulty">Difficulty</label>
                    <Field
                      as="select"
                      name="taskDifficulty"
                      value={values.taskDifficulty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="None">None</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </Field>
                  </FormGroup>

                  <button
                    type="submit"
                    disabled={!isValid}
                    style={{
                      marginTop: "1.5rem",
                      width: "55%",
                      marginRight: "5%",
                      height: "37px",
                      background: `${Theme.colors.primary}`,
                      border: `1px solid ${Theme.colors.primary}`,
                      borderRadius: "9px",
                      fontSize: "16px",
                      lineHeight: "18px",
                      color: `${Theme.colors.white}`,
                      cursor: "pointer"
                    }}
                  >
                    Add Task
                  </button>
                  <button
                    style={{
                      marginTop: "1.5rem",
                      width: "40%",
                      height: "37px",
                      background: `${Theme.colors.secondary}`,
                      border: `1px solid ${Theme.colors.primary}`,
                      borderRadius: "9px",
                      fontSize: "16px",
                      lineHeight: "18px",
                      cursor: "pointer"
                    }}
                  >
                    <a
                      href="/home/"
                      style={{
                        textDecoration: "none",
                        color: `${Theme.colors.primary}`
                      }}
                    >
                      Cancel
                    </a>
                  </button>
                </Form>
              </form>
            );
          }}
        </Formik>
      </CustomForm>
    );
  }
}

export default AddTask;
