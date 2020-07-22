import React from "react";
import { ThemeProvider } from "emotion-theming";
import { makeStyles } from "@material-ui/core/styles";
import Theme from "../shared/Theme/Theme";
import Navigation from "../Navigation/Navigation";
import Grid from "@material-ui/core/Grid";

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
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={Theme}>
        <Navigation />

        <Grid container justify="center">
          <main className={classes.content}>
            <div className={classes.toolbar}>{props.children}</div>
          </main>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
