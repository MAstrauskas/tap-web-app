import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Theme from "../shared/Theme/Theme";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  body: {
    padding: "2rem"
  },
  title: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    padding: "1rem"
  },
  readOnly: {
    padding: "1rem auto",
    "& > div": {
      color: `${Theme.colors.black} !important`
    }
  }
}));

const UpdateButton = styled(Button)({
  backgroundColor: `${Theme.colors.first}`,
  color: `${Theme.colors.white}`,
  marginTop: "2.5rem",

  "&:hover": {
    backgroundColor: `${Theme.colors.fourth}`
  },
  "&:disabled": {
    backgroundColor: `${Theme.colors.disabled}`
  }
});

export default function Settings({ user, name, userEmail }) {
  const classes = useStyles();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const body = {
        email: values.userEmail
      };
    } catch (e) {
      console.log(e);
    }
  };

  const userSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email()
      .typeError("You must enter a text.")
      .min(2, "User Email is too short.")
      .max(30, "User Email is too long.")
      .required("User Email is required."),
    userName: Yup.string()
      .typeError("You must enter a text.")
      .min(2, "User Name is too short.")
      .max(30, "User Name is too long.")
      .required("User Name is required."),
    userPassword: Yup.string()
      .typeError("You must enter a text.")
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least 8 Characters, 1 Uppercase (A-Z), 1 Lowercase (a-z), 1 Number (i.e. 0-9) and 1 Special Character (e.g. !@£$%^&*)"
      )
  });

  const message = `Password must contain: 
   * At least 8 characters in length 
   * Lower case letters (a-z) 
   * Upper case letters (A-Z) 
   * Numbers (i.e. 0-9) 
   * Special characters (e.g. !@£$%^&~*)`;

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.title}>
          <Typography variant="h5" component="h5" gutterBottom>
            <Box fontWeight="fontWeightBold">My Settings</Box>
          </Typography>
        </div>

        <Formik
          initialValues={{
            userEmail,
            userName: name,
            userPassword: ""
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {props => {
            const {
              values,
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
                data-testid="user-settings"
                autoComplete="off"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2rem"
                  }}
                >
                  <Field
                    as={TextField}
                    id="standard-required"
                    name="userName"
                    label="MY NAME"
                    data-testid="user-name"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.userName && touched.userName)}
                    helperText={
                      errors.userName &&
                      touched.userName &&
                      String(errors.userName)
                    }
                    InputProps={{
                      readOnly: true
                    }}
                    style={{ marginBottom: "1rem" }}
                  />
                  <Field
                    as={TextField}
                    type="email"
                    id="standard-required"
                    name="userEmail"
                    label="MY EMAIL"
                    data-testid="user-email"
                    value={values.userEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.userEmail && touched.userEmail)}
                    helperText={
                      errors.userEmail &&
                      touched.userEmail &&
                      String(errors.userEmail)
                    }
                    style={{ marginBottom: "1rem" }}
                  />

                  <FormControl>
                    <Field
                      as={TextField}
                      type="password"
                      id="standard-password-input"
                      name="userPassword"
                      label="NEW PASSWORD"
                      data-testid="user-password"
                      value={values.userPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.userPassword && touched.userPassword
                      )}
                    />
                    <FormHelperText style={{ width: "17rem" }}>
                      {message}
                    </FormHelperText>
                  </FormControl>

                  <UpdateButton
                    variant="contained"
                    type="submit"
                    disabled={!isValid}
                  >
                    Update
                  </UpdateButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
}
