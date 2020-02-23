import React, { Component } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import MoodForm from "../../shared/Forms/MoodForm";

const CustomPaper = withStyles(theme => ({
  root: {
    minWidth: "20rem",
    marginBottom: 2,
    borderRadius: "1%"
  }
}))(Paper);

export class Mood extends Component {
  state = {
    addSuccessful: false,
    isFetching: false
  };

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const body = {
        email: this.props.userEmail,
        moodName: values.mood,
        moodMotivation: values.moodMotivation,
        isTired: values.moodTired === "Yes" ? true : false
      };

      setSubmitting(true);

      await axios.post("/api/mood/add", body).then(
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

      setTimeout(async () => {
        await this.handleTaskSuggestion();
      }, 1000);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      this.setState(prevState => ({
        ...prevState,
        addSuccessful: false
      }));
    }
  };

  handleTaskSuggestion = async () => {
    await axios
      .get(`/api/tasks/suggest/${this.props.userEmail}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { addSuccessful } = this.state;

    if (addSuccessful) {
      return <Redirect to={`/tasks/all`} />;
    }

    const moodSchema = Yup.object().shape({
      mood: Yup.string().required("Please choose how you feel."),
      moodMotivation: Yup.string().required(
        "Please choose your motivation level."
      ),
      moodTired: Yup.string().required("Please choose whether you are tired.")
    });
    return (
      <CustomPaper elevation={3}>
        <Formik
          initialValues={{
            mood: "",
            moodMotivation: "",
            moodTired: ""
          }}
          validationSchema={moodSchema}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            } = props;

            return (
              <MoodForm
                title="Moodist"
                values={values}
                touched={touched}
                errors={errors}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isValid={isValid}
                routeBack="/tasks/all"
              />
            );
          }}
        </Formik>
      </CustomPaper>
    );
  }
}

export default Mood;
