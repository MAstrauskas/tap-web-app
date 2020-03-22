import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "../../../react-auth0-spa";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Theme from "../../shared/Theme/Theme";

const useStyles = makeStyles(theme => ({
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
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${Theme.colors.white}`,
    boxShadow: theme.shadows[5],
    padding: "0 0"
  }
}));

const Welcome = ({ name, userEmail, token }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  useEffect(() => {
    const handleUserRegistration = async (name, email) => {
      const body = {
        name: name,
        email: email
      };

      await axios
        .post("/api/user/add", body, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => console.log("User registered."))
        .catch(e => console.log("User failed to register: " + e));
    };

    const handleTasks = async email => {
      await axios
        .get(`/api/tasks/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setTasks(res.data.tasks);
        });

      setLoading(false);
    };

    if (isAuthenticated) {
      handleUserRegistration(name, userEmail);
      handleTasks(userEmail);
    }
  }, [isAuthenticated, name, userEmail, token]);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loader} color="secondary" />
      </div>
    );
  }

  const firstName = name.split(" ")[0];

  return (
    <div className={classes.root}>
      {currentTime >= 0 && currentTime < 12 && (
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
        {tasks.length === 0 ? (
          <Link to="/tasks/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size={buttonSize}
              className={classes.button}
            >
              Add your first task
            </Button>
          </Link>
        ) : (
          <Link to="/tasks/all" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size={buttonSize}
              className={classes.button}
            >
              Show me my tasks
            </Button>
          </Link>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/faq" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="small" color="primary">
            Read how the app works
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
