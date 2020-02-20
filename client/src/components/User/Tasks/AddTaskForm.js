import React, { Component } from "react";
import axios from "axios";
import { Formik, Field } from "formik";
import { Redirect } from "react-router";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { KeyboardDatePicker } from "@material-ui/pickers";

import styled from "@emotion/styled";

import Theme from "../../shared/Theme/Theme";
import moment from "moment";
import * as Yup from "yup";

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

export class AddTask extends Component {
  state = {
    addSuccessful: false,
    selectedDate: new Date()
  };

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const taskCreateDate = Date.now();
      const body = {
        email: this.props.userEmail,
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        taskCreateDate,
        taskDueDate: values.taskDueDate,
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
      this.setState(prevState => ({
        ...prevState,
        addSuccessful: true
      }));
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      this.setState(prevState => ({
        ...prevState,
        addSuccessful: false
      }));
    }
  };

  handleSelectedDate = date => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: date
    }));
  };

  render() {
    const { addSuccessful, selectedDate } = this.state;

    if (addSuccessful) {
      return <Redirect to={`/tasks/all`} />;
    }

    // Initialize dates for validation
    let currentDate = new Date();
    let todaysDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    todaysDate.setDate(todaysDate.getDate());

    const taskSchema = Yup.object().shape({
      taskName: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task name is too short.")
        .max(30, "Task name is too long.")
        .required("Task name is required."),
      taskDescription: Yup.string()
        .typeError("You must enter a text.")
        .min(2, "Task Description is too short.")
        .max(150, "Task Description is too long."),
      taskDueDate: Yup.number()
        .min(moment(currentDate), "Task Due Date cannot be in the past.")
        .required("Task Due Date is required."),
      taskPriority: Yup.string().required("Task Priority is required."),
      taskDifficulty: Yup.string().required("Task Difficulty is required."),
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
            taskDueDate: Date.parse(todaysDate),
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
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              errors,
              touched
            } = props;

            return (
              <form
                onSubmit={handleSubmit}
                data-testid="add-task-form"
                autoComplete="off"
              >
                <Title>Add a Task</Title>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    as={TextField}
                    required
                    id="standard-required"
                    name="taskName"
                    label="Name"
                    data-testid="task-name"
                    value={values.taskName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.taskName && touched.taskName)}
                    helperText={
                      errors.taskName &&
                      touched.taskName &&
                      String(errors.taskName)
                    }
                  />

                  <Field
                    as={TextField}
                    id="standard-textarea"
                    name="taskDescription"
                    label="Description"
                    data-testid="task-description"
                    rows="5"
                    multiline
                    value={values.taskDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      errors.taskDescription && touched.taskDescription
                    )}
                    helperText={
                      errors.taskDescription &&
                      touched.taskDescription &&
                      String(errors.taskDescription)
                    }
                  />

                  <Field
                    as={KeyboardDatePicker}
                    disableToolbar
                    required
                    id="date-picker-inline"
                    name="taskDueDate"
                    label="Due Date"
                    data-testid="task-due-date"
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={new Date(values.taskDueDate)}
                    onChange={date =>
                      setFieldValue("taskDueDate", Date.parse(date))
                    }
                    minDate={new Date()}
                    KeyboardButtonProps={{ "aria-label": "change due date" }}
                    error={Boolean(errors.taskDueDate && touched.taskDueDate)}
                    helperText={
                      errors.taskDueDate &&
                      touched.taskDueDate &&
                      "You must choose a valid date."
                    }
                  />

                  <FormControl
                    required
                    error={Boolean(errors.taskPriority && touched.taskPriority)}
                  >
                    <InputLabel id="priority-select-label">Priority</InputLabel>
                    <Field
                      as={Select}
                      required
                      labelId="priority-select-label"
                      id="priority-select"
                      name="taskPriority"
                      data-testid="task-priority"
                      value={values.taskPriority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Field>
                    {errors.taskPriority && touched.taskPriority && (
                      <FormHelperText>
                        {String(errors.taskPriority)}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    required
                    error={Boolean(
                      errors.taskDifficulty && touched.taskDifficulty
                    )}
                  >
                    <InputLabel id="difficulty-select-label">
                      Difficulty
                    </InputLabel>
                    <Field
                      as={Select}
                      required
                      labelId="difficulty-select-label"
                      id="difficulty-select"
                      name="taskDifficulty"
                      data-testid="task-difficulty"
                      value={values.taskDifficulty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="Easy">Easy</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Hard">Hard</MenuItem>
                    </Field>
                    {errors.taskDifficulty && touched.taskDifficulty && (
                      <FormHelperText>
                        {String(errors.taskDifficulty)}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <Form>
                  <Button type="submit" disabled={!isValid}>
                    Add Task
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
                      href="/tasks"
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
