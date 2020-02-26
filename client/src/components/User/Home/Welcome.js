import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "../../../react-auth0-spa";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Theme from "../../shared/Theme/Theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    padding: "2rem"
  },
  content: {
    padding: "1rem",
    textAlign: "center"
  },
  title: {
    paddingBottom: "1rem"
  },
  button: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    "&:hover": {
      backgroundColor: `${Theme.colors.fourth}`
    }
  }
});

const Welcome = ({ userEmail }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  const [user, setUser] = useState({});

  const currentDate = new Date();
  const currentTime = currentDate.getHours();

  const mobileView = useMediaQuery("(max-width: 600px)");
  const tabletView = useMediaQuery("(max-width: 800px)");
  const desktopView = useMediaQuery("(min-width: 801px)");

  let titleSize = "h2";
  let subtitleSize = "h5";
  let buttonSize = "large";

  if (desktopView) titleSize = "h3";
  if (tabletView) {
    titleSize = "h4";
    subtitleSize = "h6";
    buttonSize = "medium";
  }
  if (mobileView) {
    titleSize = "h5";
    subtitleSize = "p";
    buttonSize = "small";
  }

  const handleUser = async email => {
    const body = { email: email };

    await axios
      .get("/api/user/single", body)
      .then(res => setUser(res.data))
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (isAuthenticated) handleUser(userEmail);
  }, []);

  const firstName = user.firstName;

  return (
    <div className={classes.root}>
      {currentTime >= 4 && currentTime < 12 && (
        <div className={classes.content}>
          <Typography
            variant={titleSize}
            component={titleSize}
            data-testid="greeting-morning"
            className={classes.title}
          >
            Good morning, {firstName}
          </Typography>
          <Typography variant={subtitleSize} component={subtitleSize}>
            You're off to a good start!
          </Typography>
        </div>
      )}
      {currentTime >= 12 && currentTime < 18 && (
        <div className={classes.content}>
          <Typography
            variant={titleSize}
            component={titleSize}
            data-testid="greeting-afternoon"
            className={classes.title}
          >
            Good afternoon, {firstName}
          </Typography>
          <Typography variant={subtitleSize} component={subtitleSize}>
            Keep it steady!
          </Typography>
        </div>
      )}
      {currentTime >= 18 && (
        <div className={classes.content}>
          <Typography
            variant={titleSize}
            component={titleSize}
            data-testid="greeting-evening"
            className={classes.title}
          >
            Good evening, {firstName}
          </Typography>
          <Typography variant={subtitleSize} component={subtitleSize}>
            Remember to take some rest!
          </Typography>
        </div>
      )}
      <div className={classes.content}>
        <Link to="/home">
          <Button
            variant="contained"
            size={buttonSize}
            className={classes.button}
          >
            Show me today's tasks
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
