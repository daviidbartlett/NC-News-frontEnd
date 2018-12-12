import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Contents from "./components/Contents";
import { Router } from "@reach/router";
import * as api from "./api";
import Article from "./components/Article";

class App extends Component {
  state = {
    topics: [],
    user: {
      name: ""
    }
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav topics={this.state.topics} user={user} />
        <SideBar />
        <Router id="contents">
          <Contents path="/" />
          <Contents path="/:topics" user={user} />
          <Article path="/:topics/:article_id" />
        </Router>
        <Footer />
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      console.log(topics);
      this.setState({ topics });
    });
  };
}

export default App;
