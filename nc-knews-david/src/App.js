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
import NewCommentForm from "./components/NewCommentForm";

class App extends Component {
  state = {
    topics: [],
    user: null,
    articles: [],
    article: {},
    comments: []
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
          <NewCommentForm
            path="/:topic/:article_id"
            user={user}
            updateStateWithNewComment={this.updateStateWithNewComment}
          />
        </Router>

        <Router id="contents">
          <Contents
            path="/"
            user={user}
            addVote={this.addVote}
            fetchArticles={this.fetchArticles}
            articles={this.state.articles}
            deleteItem={this.deleteItem}
          />
          <Contents
            path="/:topic"
            user={user}
            addVote={this.addVote}
            fetchArticles={this.fetchArticles}
            articles={this.state.articles}
            deleteItem={this.deleteItem}
          />
          <Article
            path="/:topic/:article_id"
            fetchArticle={this.fetchArticle}
            user={user}
            addVote={this.addVote}
            article={this.state.article}
            fetchCommentsForArticle={this.fetchCommentsForArticle}
            comments={this.state.comments}
            deleteItem={this.deleteItem}
          />
        </Router>
        <Footer />
      </div>
    );
  }
  deleteItem = (article_id, comment_id) => {
    api.deleteData(article_id, comment_id);
    if (comment_id) {
      const newComments = this.state.comments.filter((comment) => {
        return comment_id !== comment.comment_id;
      });
      this.setState({ comments: newComments });
    } else {
      const newArticles = this.state.articles.filter((article) => {
        return article_id !== article.article_id;
      });
      this.setState({ articles: newArticles });
    }
  };

  componentDidMount = () => {
    this.fetchTopics();
  };
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
  fetchArticle = (article_id) => {
    api.getArticle(article_id).then((article) => {
      this.setState({
        article: { ...article, voted: 0 }
      });
    });
  };
  fetchCommentsForArticle = (article_id) => {
    api.getComments(article_id).then((comments) => {
      this.setState({
        comments: comments.map((comment) => {
          comment.voted = 0;
          return comment;
        })
      });
    });
  };
  updateStateWithNewArticle = (topic) => {
    this.fetchArticles(topic);
  };
  updateStateWithNewComment = (article_id) => {
    this.fetchCommentsForArticle(article_id);
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
  addVote = (article_id, vote, type, comment_id) => {
    const increment = vote === "upVote" ? 1 : -1;
    console.log(article_id, vote, type, comment_id, "passed into function");
    if (comment_id) {
      api
        .updateCommentVote(article_id, increment, comment_id)
        .then((article) => {
          this.setState(({ comments }) => ({
            comments: comments.map((mapCom) => {
              if (mapCom.comment_id === article.comment_id) {
                mapCom.votes += increment;
                mapCom.voted = increment;
              }
              return mapCom;
            })
          }));
        });
    } else
      api.updateArticleVote(article_id, increment).then((article) => {
        if (type === "map") {
          this.setState(({ articles }) => ({
            articles: articles.map((mapArt) => {
              if (mapArt.article_id === article.article_id) {
                mapArt.votes += increment;
                mapArt.voted = increment;
              }

              return mapArt;
            })
          }));
        } else
          this.setState(({ article }) => ({
            article: {
              ...article,
              votes: article.votes + increment,
              voted: increment
            }
          }));
      });
  };
}

export default App;
