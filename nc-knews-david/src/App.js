import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Contents from "./components/Contents";
import { Router, navigate } from "@reach/router";
import * as api from "./api";
import Article from "./components/Article";
import NewArticleForm from "./components/NewArticleForm";
import NewCommentForm from "./components/NewCommentForm";
import ErrorPage from "./components/ErrorPage";
import FirstArticle from "./components/FirstArticle";

class App extends Component {
  state = {
    topics: [],
    user: null,
    articles: [],
    article: {},
    comments: [],
    p: 1
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
          <SideBar path="/" user={user} addTopic={this.addTopic} />
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
            fetchCommentsForArticle={this.fetchCommentsForArticle}
            articles={this.state.articles}
            deleteItem={this.deleteItem}
            fetchMoreArticles={this.fetchMoreArticles}
          />
          <Contents
            path="/:topic"
            user={user}
            addVote={this.addVote}
            fetchArticles={this.fetchArticles}
            fetchCommentsForArticle={this.fetchCommentsForArticle}
            articles={this.state.articles}
            deleteItem={this.deleteItem}
            fetchMoreArticles={this.fetchMoreArticles}
          />
          <Article
            path="/:topic/:article_id"
            fetchArticle={this.fetchArticle}
            fetchArticles={this.fetchArticles}
            user={user}
            addVote={this.addVote}
            article={this.state.article}
            fetchCommentsForArticle={this.fetchCommentsForArticle}
            comments={this.state.comments}
            deleteItem={this.deleteItem}
          />
          <ErrorPage path="/error" />
          <FirstArticle
            path="/firstArticle"
            user={this.state.user}
            updateStateWithNewArticle={this.updateStateWithNewArticle}
          />
        </Router>

        <Footer />
      </div>
    );
  }

  deleteItem = (article_id, comment_id) => {
    api
      .deleteData(article_id, comment_id)
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
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

  fetchMoreArticles = () => {
    this.setState(
      (prevState) => ({ p: prevState.p + 1 }),
      this.fetchArticles(
        this.state.topic,
        `${this.state.query}&limit=${this.state.limit}&p=${this.state.p}`
      )
    );
  };

  fetchArticles = (topic, query) => {
    console.log(query);
    api
      .getArticles(topic, query, this.state.p)
      .then((articles) => {
        this.setState((prevState) => ({
          articles: [
            ...articles,
            articles.map((article) => {
              article.voted = 0;
              return article;
            })
          ]
        }));
      })
      .catch((err) => {
        if (err.response.status === 404)
          navigate("/firstArticle", { state: { topic: topic } });
        else navigate("/error", { state: { errMsg: err.response.data.msg } });
      });
  };
  fetchArticle = (article_id) => {
    api
      .getArticle(article_id)
      .then((article) => {
        this.setState({
          article: { ...article, voted: 0 }
        });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
  fetchCommentsForArticle = (article_id, query) => {
    api
      .getComments(article_id, query)
      .then((comments) => {
        this.setState({
          comments: comments.map((comment) => {
            comment.voted = 0;
            return comment;
          })
        });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
  updateStateWithNewArticle = (topic, query) => {
    this.fetchArticles(topic, query);
  };
  updateStateWithNewComment = (article_id) => {
    this.fetchCommentsForArticle(article_id).catch((err) =>
      navigate("/error", { state: { errMsg: err.response.data.msg } })
    );
  };

  fetchTopics = () => {
    api
      .getTopics()
      .then((topics) => {
        this.setState({ topics });
      })
      .catch((err) =>
        navigate("/error", { state: { errMsg: err.response.data.msg } })
      );
  };
  setUser = (userObj) => {
    this.setState({ user: userObj }).catch((err) =>
      navigate("/error", { state: { errMsg: err.response.data.msg } })
    );
  };
  handleLogout = () => {
    this.setState({ user: null }).catch((err) =>
      navigate("/error", { state: { errMsg: err.response.data.msg } })
    );
  };
  addVote = (article_id, vote, type, comment_id) => {
    const increment = vote === "upVote" ? 1 : -1;
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
        })
        .catch((err) =>
          navigate("/error", { state: { errMsg: err.response.data.msg } })
        );
    } else
      api
        .updateArticleVote(article_id, increment)
        .then((article) => {
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
        })
        .catch((err) =>
          navigate("/error", { state: { errMsg: err.response.data.msg } })
        );
  };

  addTopic = (slug, description) => {
    api
      .postTopic(slug, description)

      .then((topic) => {
        this.setState((prevState) => ({
          topics: [...prevState.topics, topic]
        }));
      });
  };
}

export default App;
