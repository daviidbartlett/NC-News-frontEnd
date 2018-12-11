import React, { Component } from "react";
import * as api from "../api";

class Article extends Component {
  state = {
    article: {}
  };
  render() {
    const { body, title } = this.state.article;
    return (
      <ul>
        <li>{title}</li>
        <li>{body}</li>
      </ul>
    );
  }
  componentDidMount = () => {
    this.fetchArticle();
  };

  fetchArticle = () => {
    api.getArticle(this.props.article_id).then((article) => {
      this.setState({ article });
    });
  };
}

export default Article;
