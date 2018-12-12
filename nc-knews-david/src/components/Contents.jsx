import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class Contents extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <ArticleCard
        articles={this.props.articles}
        addVote={this.addVote}
        user={user}
      />
    );
  }
  componentDidMount = () => {
    console.log(this.props.topic);
    this.props.fetchArticles(this.props.topic);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.topic !== this.props.topic)
      this.props.fetchArticles(this.props.topic);
    console.log(
      JSON.stringify(prevProps.articles.length) !==
        JSON.stringify(this.props.articles.length)
    );
    if (
      JSON.stringify(prevProps.articles) !== JSON.stringify(this.props.articles)
    )
      this.props.fetchArticles(this.props.topic);
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user))
      this.props.fetchArticles();
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
