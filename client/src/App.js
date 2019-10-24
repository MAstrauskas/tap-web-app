import React from "react";

import Layout from "./components/shared/Layout/Layout";
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
          <h1>Test Items fetched from Back End and MongoDB</h1>
          {testItems.map(item => {
            return <div key={item.id}>{item.name}</div>;
          })}
        </Layout>
      </div>
    );
  }
}

export default App;
