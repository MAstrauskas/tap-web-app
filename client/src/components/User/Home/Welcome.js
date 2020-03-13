import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "../../../react-auth0-spa";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

const Welcome = ({ name, userEmail }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

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

  const handleUserRegistration = async (name, email) => {
    const body = {
      name: name,
      email: email
    };

    await axios
      .post("/api/user/add", body)
      .then(res => console.log("User registered"))
      .catch(e => console.log("User failed to register: " + e));
  };

  const handleTasks = async email => {
    await axios.get(`/api/tasks/${email}`).then(res => {
      setTasks(...tasks, res.data.tasks);
    });

    setLoading(false);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleUserRegistration(name, userEmail);
      handleTasks(userEmail);
    }
  }, []);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loader} color="secondary" />
      </div>
    );
  }

  const firstName = name.split(" ")[0];

  // TODO Change to each user rather than browser
  if (document.cookie.indexOf("showNotification=true") == -1) {
    document.cookie = "showNotification=true; max-age=86400";

    handleOpenDetails();
  }

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

      <Modal
        aria-labelledby="Notification"
        aria-describedby="Mood notification"
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openDetails}>
          <div
            className={classes.paper}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem 4rem"
            }}
          >
            <Typography variant="h4" component="h4" gutterBottom>
              How are you feeling?
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Link to="/tasks/moodist" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="small" color="primary">
                  Add a mood
                </Button>
              </Link>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Welcome;
