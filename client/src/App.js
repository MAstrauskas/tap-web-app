import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Welcome from "./components/User/Home/Welcome";
import Home from "./components/User/Home/Home";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";
import Summary from "./components/User/Summary/Summary";
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

  return (
    <Router>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className="App">
          <Switch>
            <Route path="/home">
              {isAuthenticated ? (
                <Layout>
                  <Home name={user.name} userEmail={user.email} />
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
              <Route path="/tasks/edit" component={EditTask}></Route>
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
                  <Welcome userEmail={user.email} />
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
