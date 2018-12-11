import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class Contents extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <ArticleCard
        articles={this.state.articles}
        fetchArticles={this.fetchArticles}
      />
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topics !== this.props.topics) this.fetchArticles();
  };

  fetchArticles = () => {
    api.getArticles(this.props.topics).then((articles) => {
      this.setState({ articles });
    });
  };
}

export default Contents;
