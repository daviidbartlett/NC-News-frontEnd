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
    user: null,
    articles: []
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
            updateStateWithNewArticle={this.updateStateWithNewArticle}
          />
        </Router>

        <Router id="contents">
          <Contents
            path="/"
            user={user}
            fetchArticles={this.fetchArticles}
            articles={this.state.articles}
          />
          <Contents
            path="/:topic"
            user={user}
            fetchArticles={this.fetchArticles}
            articles={this.state.articles}
          />
          <Article path="/:topic/:article_id" />
        </Router>
        <Footer />
      </div>
    );
  }
  fetchArticles = (topic) => {
    api.getArticles(topic).then((articles) => {
      this.setState({
        articles: articles.map((article) => {
          article.voted = 0;
          return article;
        })
      });
    });
  };
  componentDidMount = () => {
    this.fetchTopics();
  };
  updateStateWithNewArticle = (topic) => {
    this.fetchArticles(topic);
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
}

export default App;
