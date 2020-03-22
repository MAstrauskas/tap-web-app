import React from "react";
import { Formik, Field } from "formik";
import { withRouter, useHistory } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

const BackButton = styled(Button)({
  backgroundColor: `${Theme.colors.third}`,
  color: `${Theme.colors.black}`,
  marginTop: "1rem",
  width: "100%",

  "&:hover": {
    backgroundColor: `${Theme.colors.fifth}`
  }
});

function Account({ name, userEmail, k }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.title}>
          <Typography variant="h5" component="h5" gutterBottom>
            <Box fontWeight="fontWeightBold">My Account</Box>
          </Typography>
        </div>

        <Formik
          initialValues={{
            userEmail,
            userName: name
          }}
        >
          {props => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
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
                    InputProps={{
                      readOnly: true
                    }}
                    style={{ marginBottom: "1rem" }}
                  />

                  <BackButton onClick={history.goBack}>Go back</BackButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
}

export default withRouter(Account);
