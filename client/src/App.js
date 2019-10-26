import React from "react";

import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
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
      <div className="App">
        <Layout>
          <Cover />
        </Layout>
      </div>
    );
  }
}

export default App;
