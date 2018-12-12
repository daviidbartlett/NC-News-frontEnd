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
import NewArticleForm from "./components/NewArticleForm";

class App extends Component {
  state = {
    topics: [],
    user: null
  };

  render() {
    const { user, topics } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav
          topics={topics}
          user={user}
          setUser={this.setUser}
          handleLogout={this.handleLogout}
        />
        <Router id="sideBar">
          <SideBar path="/" user={user} />

          <NewArticleForm
            path="/:topic"
            user={user}
            addNewArticle={this.addNewArticle}
          />
        </Router>

        <Router id="contents">
          <Contents path="/" user={user} />
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
      this.setState({ topics });
    });
  };
  setUser = (userObj) => {
    this.setState({ user: userObj });
  };
  handleLogout = () => {
    this.setState({ user: null });
  };

  addNewArticle = (topic, title, body) => {
    api
      .postNewArticle(topic, title, body, this.state.user.user_id)
      .then(console.log);
  };
}

export default App;
