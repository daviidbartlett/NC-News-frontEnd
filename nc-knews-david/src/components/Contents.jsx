import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class Contents extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <ArticleCard articles={this.state.articles} addVote={this.addVote} />
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topics !== this.props.topics) this.fetchArticles();

    if (
      JSON.stringify(prevState.articles[30]) !==
      JSON.stringify(this.state.articles[30])
    )
      this.fetchArticles();
  };

  fetchArticles = () => {
    api.getArticles(this.props.topics).then((articles) => {
      this.setState({
        articles: articles.map((article) => {
          article.voted = 0;
          return article;
        })
      });
    });
  };
  addVote = (id, vote) => {
    const increment = vote === "upVote" ? 1 : -1;

    api.updateVote(id, increment).then((article) => {
      this.setState(({ articles }) => ({
        articles: articles.map((mapArt) => {
          if (mapArt.article_id === article.article_id) {
            mapArt.votes += increment;
            mapArt.voted = increment;
          }

          return mapArt;
        })
      }));
    });
  };
}

export default Contents;
