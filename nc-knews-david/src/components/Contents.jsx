import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class Contents extends Component {
  state = {
    articles: []
  };
  render() {
    const { user } = this.props;
    return (
      <ArticleCard
        articles={this.state.articles}
        addVote={this.addVote}
        user={user}
      />
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.topics !== this.props.topics) this.fetchArticles();
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user))
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
