import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TaskForm from "../../shared/Forms/TaskForm";

const CustomPaper = withStyles(() => ({
  root: {
    minWidth: "20rem",
    marginBottom: 2,
    borderRadius: "1%",
  },
}))(Paper);

class AddTask extends Component {
  state = {
    addSuccessful: false,
  };

  /* istanbul ignore next */
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
        isTaskSuggested: values.isTaskSuggested,
      };

      setSubmitting(true);

      await axios
        .post("/api/tasks/add", body, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(
          () => {
            console.log("Task added.");
          },
          (error) => {
            console.log(error);
          }
        );

      await axios
        .get(`/api/tasks/calculate-suggest/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(() => {})
        .catch((err) => console.log(err));

      await axios
        .get(`/api/tasks/make-suggest/${this.props.userEmail}`, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(() => {})
        .catch((err) => console.log(err));

      setSubmitting(false);
      this.setState((prevState) => ({
        ...prevState,
        addSuccessful: true,
      }));
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      this.setState((prevState) => ({
        ...prevState,
        addSuccessful: false,
      }));
    }
  };

  render() {
    const { addSuccessful } = this.state;

    if (addSuccessful) {
      this.props.history.goBack();
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
        .min(2, "Task description is too short.")
        .max(150, "Task description is too long."),
      taskDueDate: Yup.number()
        .min(moment(currentDate), "Task Due Date cannot be in the past.")
        .required("Task due date is required."),
      taskPriority: Yup.string().required("Task Priority is required."),
      taskDifficulty: Yup.string().required("Task Difficulty is required."),
      isTaskComplete: Yup.boolean(),
      isTaskSuggested: Yup.boolean(),
    });

    return (
      <CustomPaper elevation={3} data-testid="add-task-form">
        <Formik
          initialValues={{
            taskName: "",
            taskDescription: "",
            taskCreateDate: Date.now(),
            taskDueDate: Date.parse(todaysDate),
            taskPriority: "",
            taskDifficulty: "",
            isTaskComplete: false,
            isTaskSuggested: false,
          }}
          validationSchema={taskSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              errors,
              touched,
            } = props;

            return (
              <TaskForm
                title="Add a Task"
                values={values}
                touched={touched}
                errors={errors}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isValid={isValid}
                routeBack={this.props.history.goBack}
              />
            );
          }}
        </Formik>
      </CustomPaper>
    );
  }
}

export default withRouter(AddTask);
