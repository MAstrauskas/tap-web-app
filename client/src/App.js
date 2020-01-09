import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import Layout from "./components/Layout/Layout";
import UserLayout from "./components/User/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Home from "./components/User/Home/Home";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";
import Error from "./components/Error/Error";
import "./App.css";

function App() {
  const { loading, isAuthenticated, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home">
            {isAuthenticated ? (
              <UserLayout>
                <Home name={user.name} email={user.email} />
              </UserLayout>
            ) : (
              <Error errCode="404" />
            )}
          </Route>
          <Route path="/tasks/add">
            {isAuthenticated ? (
              <UserLayout>
                <AddTask />
              </UserLayout>
            ) : (
              <Error errCode="404" />
            )}
          </Route>
          {isAuthenticated && (
            <Route path="/tasks/edit" component={EditTask}></Route>
          )}
          <Route path="/tasks/all">
            {isAuthenticated ? (
              <UserLayout>
                <AllTasks />
              </UserLayout>
            ) : (
              <Error errCode="404" />
            )}
          </Route>
          <Route path="/tasks/moodist">
            {isAuthenticated ? (
              <UserLayout>
                <Mood />
              </UserLayout>
            ) : (
              <Error errCode="404" />
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
