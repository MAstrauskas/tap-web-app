import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router";
import moment from "moment";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

import Theme from "../../shared/Theme/Theme";
import UserLayout from "../Layout/Layout";

import "react-datepicker/dist/react-datepicker.css";

const CustomForm = styled.div`
  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
  form {
    padding: 0rem 8rem;
  }

  @media screen and (min-width: 550px) and (max-width: 1050px) {
    margin-top: 10rem;
  }
`;

const Title = styled.h1`
  font-size: ${Theme.fontSize.xlarge};

  @media screen and (max-width: 550px) {
    font-size: ${Theme.fontSize.large};
  }
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

    ${({ error }) =>
      error && {
        boxShadow: `0 0 0 3px ${Theme.color.error}`
      }};
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

const Error = styled.span`
  width: 94%;
  margin-left: 0.2rem;
  padding: 0.5rem;

  color: ${Theme.colors.error};
  box-shadow: 0 0 0 3px ${Theme.colors.error};
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;

  background-color: ${Theme.colors.white};
  text-align: center;
  z-index: 500;
`;

const ErrorDate = styled.span`
  width: 33%;
  margin-left: 0.2rem;
  padding: 0.5rem;

  color: ${Theme.colors.error};
  box-shadow: 0 0 0 3px ${Theme.colors.error};
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;

  background-color: ${Theme.colors.white};
  text-align: center;
  z-index: 0;
`;

const Button = styled.button`
  width: 55%;
  height: 37px;
  margin-right: 5%;
  background: ${Theme.colors.primary};
  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
  font-size: 16px;
  line-height: 18px;
  color: ${Theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    background: ${Theme.colors.disabled};
    border-color: ${Theme.colors.disabled};
    &:hover {
      opacity: 1;
      cursor: not-allowed;
    }
  }

  &:active {
    font-size: ${Theme.fontSize.small};
    transform: translateY(1px);
  }

  &.active {
    font-size: 0;
    border-radius: 25px;
    width: 50px;
    background: transparent;
  }

  &.loader {
    border-right: 2px solid ${Theme.colors.white};
    animation: loader 0.4s linear infinite;
  }

  &.success {
    background: ${Theme.colors.success};
    border-color: ${Theme.colors.success};
    font-size: ${Theme.fontSize.small};
  }

  @keyframes loader {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

export class EditTask extends Component {
  state = {
    editSuccessful: false
  };

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const taskUpdateDate = Date.now();
      const body = {
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        taskUpdateDate,
        taskDueDate: values.taskDueDate,
        taskPriority: values.taskPriority,
        taskDifficulty: values.taskDifficulty,
        isTaskComplete: values.isTaskComplete,
        isTaskSuggested: values.isTaskSuggested
      };

      setSubmitting(true);

      await axios
        .put(
          `http://localhost:9000/api/tasks/edit/${this.props.location.state.task._id}`,
          body
        )
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );

      setSubmitting(false);
      this.setState(prevState => ({
        ...prevState,
        editSuccessful: true
      }));
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      this.setState(prevState => ({
        ...prevState,
        editSuccessful: false
      }));
    }
  };

  render() {
    const { editSuccessful } = this.state;

    if (editSuccessful) {
      return <Redirect to={`/tasks/all`} />;
    }

    // Set Date to yesterday for validation
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const taskSchema = Yup.object().shape({
      taskName: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task Name is too short.")
        .max(30, "Task Name is too long.")
        .required("Task Name is required."),
      taskDescription: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task Description is too short.")
        .max(150, "Task Description is too long."),
      taskDueDate: Yup.number().min(
        moment(currentDate),
        "Task Due Date cannot be in the past."
      ),
      taskPriority: Yup.string(),
      taskDifficulty: Yup.string(),
      isTaskComplete: Yup.boolean(),
      isTaskSuggested: Yup.boolean()
    });

    const { task } = this.props.location.state;

    return (
      <UserLayout>
        <CustomForm>
          <Formik
            initialValues={{
              taskName: task.taskName,
              taskDescription: task.taskDescription,
              taskUpdateDate: Date.now(),
              taskDueDate: Date.parse(task.taskDueDate),
              taskPriority: task.taskPriority,
              taskDifficulty: task.taskDifficulty,
              isTaskComplete: false,
              isTaskSuggested: false
            }}
            validationSchema={taskSchema}
            onSubmit={this.handleSubmit}
          >
            {props => {
              const {
                values,
                setFieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid
              } = props;

              return (
                <form onSubmit={handleSubmit} data-testid="add-task-form">
                  <Title>Edit Your Task</Title>

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
                        error={"Wrong"}
                      />
                      <ErrorMessage name="taskName" component={Error} />
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
                      <ErrorMessage name="taskDescription" component={Error} />
                    </FormDescription>
                    <FormGroup>
                      <label htmlFor="taskDueDate">Due Date</label>
                      <Field
                        as={DatePicker}
                        name="taskDueDate"
                        selected={values.taskDueDate}
                        onChange={date =>
                          setFieldValue("taskDueDate", Date.parse(date))
                        }
                        dateFormat="dd/MM/yyyy"
                        showTimeSelect
                      />
                      <ErrorMessage name="taskDueDate" component={ErrorDate} />
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
                      <ErrorMessage name="taskPriority" component={Error} />
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
                      <ErrorMessage name="taskDifficulty" component={Error} />
                    </FormGroup>

                    <Button type="submit" disabled={!isValid}>
                      Edit Task
                    </Button>
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
                        href="/tasks/all"
                        style={{
                          textDecoration: "none",
                          color: `${Theme.colors.primary}`
                        }}
                      >
                        Back
                      </a>
                    </button>
                  </Form>
                </form>
              );
            }}
          </Formik>
        </CustomForm>
      </UserLayout>
    );
  }
}

export default EditTask;
