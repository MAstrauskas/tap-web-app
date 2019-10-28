import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Home from "./components/User/Home/Home";
import "./App.css";

class App extends React.Component {
  state = { testItems: [] };

  componentDidMount() {
    fetch("/api/testItem")
      .then(res => res.json())
      .then(testItems => this.setState({ testItems }));
  }

  render() {
    const { testItems } = this.state;

    return (
      <Router>
        <div className="App">
          <Layout>
            <Cover />
          </Layout>
        </div>

        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Cover />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
