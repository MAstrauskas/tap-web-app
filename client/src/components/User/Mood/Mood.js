import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router";
import styled from "@emotion/styled";

import Theme from "../../shared/Theme/Theme";
import * as Yup from "yup";
import {
  IoMdHappy as PositiveEmoji,
  IoMdSad as NegativeEmoji
} from "react-icons/io";
import { MdSentimentNeutral as NeutralEmoji } from "react-icons/md";
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

const Icon = styled.i`
  svg {
    margin-top: -6px;
    width: 35px;
    height: 33px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;

  input {
    margin-top: -1%;
    margin-left: -10%;
  }
`;

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

      await axios.post("http://localhost:9000/api/mood/add", body).then(
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
      <CustomForm>
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
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            } = props;

            return (
              <form onSubmit={handleSubmit} data-testid="add-mood-form">
                <Title>Moodist</Title>
                {this.state.isFetching ? (
                  <h2>Loading...</h2>
                ) : (
                  <Form>
                    <FormGroup>
                      <label htmlFor="mood">How are you feeling? * </label>

                      <RadioGroup>
                        <Icon>
                          <PositiveEmoji />
                        </Icon>

                        <Field
                          as="input"
                          type="radio"
                          data-testid="mood-positive"
                          name="mood"
                          value="positive"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Icon>
                          <NeutralEmoji />
                        </Icon>
                        <Field
                          as="input"
                          type="radio"
                          data-testid="mood-neutral"
                          name="mood"
                          value="neutral"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Icon>
                          <NegativeEmoji />
                        </Icon>

                        <Field
                          as="input"
                          type="radio"
                          data-testid="mood-negative"
                          name="mood"
                          value="negative"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </RadioGroup>

                      <ErrorMessage name="mood" component={Error} />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="moodMotivation">
                        Rate your motivation level *
                      </label>
                      <Field
                        as="select"
                        data-testid="mood-motivation"
                        name="moodMotivation"
                        value={values.moodMotivation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="None">None</option>
                        <option value="Low">Low - I have no motivation</option>
                        <option value="Medium">
                          Medium - I want to do some stuff
                        </option>
                        <option value="High">High - bring it on!</option>
                      </Field>
                      <ErrorMessage name="moodMotivation" component={Error} />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="moodTired">Are you tired? *</label>
                      <Field
                        as="select"
                        data-testid="mood-tired"
                        name="moodTired"
                        value={values.moodTired}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="None">None</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage name="moodTired" component={Error} />
                    </FormGroup>

                    <Button type="submit" disabled={!isValid}>
                      Add My Mood
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
                )}
              </form>
            );
          }}
        </Formik>
      </CustomForm>
    );
  }
}

export default Mood;
