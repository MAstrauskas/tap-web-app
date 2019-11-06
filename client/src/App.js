import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserLayout from "./components/User/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Home from "./components/User/Home/Home";
import AddTask from "./components/User/Tasks/AddTask";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/home">
              <UserLayout>
                <Home />
              </UserLayout>
            </Route>
            <Route path="/tasks/add">
              <UserLayout>
                <AddTask />
              </UserLayout>
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
}

export default App;
