import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Theme from "../shared/Theme/Theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    padding: "2rem",
  },
  content: {
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    paddingBottom: "1rem",
  },
  redLetters: {
    color: `${Theme.colors.first}`,
  },
});

const Cover = () => {
  const classes = useStyles();

  const mobileView = useMediaQuery("(max-width: 600px)");
  const tabletView = useMediaQuery("(max-width: 800px)");
  const desktopView = useMediaQuery("(min-width: 801px)");

  let titleSize = "h1";
  let subtitleSize = "h4";

  if (desktopView) titleSize = "h2";
  if (tabletView) {
    titleSize = "h3";
    subtitleSize = "h5";
  }
  if (mobileView) {
    titleSize = "h4";
    subtitleSize = "p";
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography
          variant={titleSize}
          component={titleSize}
          data-testid="cover-title"
          className={classes.title}
        >
          <span className={classes.redLetters}>T</span>ask{" "}
          <span className={classes.redLetters}>A</span>ctivity{" "}
          <span className={classes.redLetters}>P</span>lanner
        </Typography>
        <Typography
          variant={subtitleSize}
          component={subtitleSize}
          data-testid="cover-subtitle"
        >
          A new way of task management - based on your{" "}
          <span className={classes.redLetters}>emotions</span>
        </Typography>
      </div>
    </div>
  );
};

export default Cover;
