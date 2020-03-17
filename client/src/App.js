import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import schedule from "node-schedule";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Welcome from "./components/User/Home/Welcome";
import Home from "./components/User/Home/Home";
import FAQ from "./components/User/FAQ";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";
import Summary from "./components/User/Summary/Summary";
import Settings from "./components/User/Settings";
import Error from "./components/Error/Error";

import "./App.css";

import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(12)
    }
  },
  loader: {
    marginTop: "25%"
  }
}));

function App() {
  const classes = useStyles();
  const { loading, isAuthenticated, user } = useAuth0();

  /* istanbul ignore next */
  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loader} color="secondary" />
      </div>
    );
  }

  const clearMoods = async () => {
    await axios.get("/api/user/clearMood");
  };

  const clearSuggestedTasks = async () => {
    await axios.post("/api/tasks/clear-suggest");
  };

  // Clears All Moods and Suggested Tasks every midnight
  schedule.scheduleJob("0 0 * * *", () => {
    clearMoods();
    clearSuggestedTasks();
  });

  return (
    <Router>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className="App">
          <Switch>
            <Route path="/home">
              {isAuthenticated ? (
                <Layout>
                  <Home userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/settings">
              {isAuthenticated ? (
                <Layout>
                  <Settings userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/faq">
              {isAuthenticated ? (
                <Layout>
                  <FAQ userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/tasks/add">
              {isAuthenticated ? (
                <Layout>
                  <AddTask userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            {isAuthenticated && (
              <Route path="/tasks/edit">
                <EditTask userEmail={user.email} />
              </Route>
            )}
            <Route path="/tasks/all">
              {isAuthenticated ? (
                <Layout>
                  <AllTasks userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/tasks/moodist">
              {isAuthenticated ? (
                <Layout>
                  <Mood userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/tasks/summary">
              {isAuthenticated ? (
                <Layout>
                  <Summary userEmail={user.email} />
                </Layout>
              ) : (
                <Error errCode="401" />
              )}
            </Route>
            <Route path="/">
              <Layout>
                {isAuthenticated ? (
                  <Welcome name={user.name} userEmail={user.email} />
                ) : (
                  <Cover />
                )}
              </Layout>
            </Route>
          </Switch>
        </div>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
