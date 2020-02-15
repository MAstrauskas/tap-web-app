import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Home from "./components/User/Home/Home";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";
import Error from "./components/Error/Error";
import "./App.css";

import "typeface-roboto";

function App() {
  const { loading, isAuthenticated, user } = useAuth0();

  /* istanbul ignore next */
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home">
            {isAuthenticated ? (
              <Layout>
                <Home name={user.name} email={user.email} />
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
          <Route path="/">
            <Layout>
              <Cover />
            </Layout>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
