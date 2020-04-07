import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Theme from "../shared/Theme/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 0,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  errorMessage: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "15% auto",
  },
  subTitle: {
    margin: "auto 30%",
    marginBottom: "30px",
    textAlign: "center",
    fontSize: `${Theme.fontSize.small}`,
  },
}));

const BackButton = styled(Button)({
  backgroundColor: `${Theme.colors.third}`,
  color: `${Theme.colors.black}`,
  marginTop: "1rem",

  "&:hover": {
    backgroundColor: `${Theme.colors.first}`,
  },
});

const Error = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid container justify="center">
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <div className={classes.errorMessage}>
              <Typography variant="h4" component="h4" gutterBottom>
                Looks like you've lost!
              </Typography>
              <Typography
                variant="body1"
                component="body1"
                gutterBottom
                className={classes.subTitle}
              >
                The page you have tried to access does not exist.
              </Typography>

              <BackButton onClick={history.goBack}>Go back</BackButton>
            </div>
          </div>
        </main>
      </Grid>
    </div>
  );
};

export default Error;
