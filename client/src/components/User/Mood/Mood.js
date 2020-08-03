import React, { Component } from "react";
import * as Yup from "yup";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MoodForm from "../../shared/Forms/MoodForm";

const CustomPaper = withStyles(() => ({
  root: {
    minWidth: "20rem",
    marginBottom: 2,
    borderRadius: "1%",
  },
}))(Paper);

class Mood extends Component {
  state = {
    addSuccessful: false,
    isFetching: false,
  };

  /* istanbul ignore next */
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const body = {
        email: this.props.userEmail,
        moodName: values.mood,
        moodMotivation: values.moodMotivation,
        isTired: values.moodTired === "Yes",
      };

      setSubmitting(true);

      await axios
        .post("/api/mood/add", body, {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then(
          () => {
            console.log("Mood added.");
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

      // Go back to the previous page after the mood has been added
      this.props.history.goBack();
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
    const moodSchema = Yup.object().shape({
      mood: Yup.string().required("Please choose how you feel."),
      moodMotivation: Yup.string().required(
        "Please choose your motivation level."
      ),
      moodTired: Yup.string().required("Please choose whether you are tired."),
    });

    return (
      <CustomPaper elevation={3}>
        <Formik
          initialValues={{
            mood: "",
            moodMotivation: "",
            moodTired: "",
          }}
          validationSchema={moodSchema}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
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
                routeBack={this.props.history.goBack}
              />
            );
          }}
        </Formik>
      </CustomPaper>
    );
  }
}

export default withRouter(Mood);
