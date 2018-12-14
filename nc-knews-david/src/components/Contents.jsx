import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import QueryBar from "./QueryBar";

class Contents extends Component {
  render() {
    const { user, topic, fetchArticles } = this.props;
    return (
      <>
        <QueryBar
          topic={topic}
          fetchArticles={fetchArticles}
          fetchCommentsForArticle={this.props.fetchCommentsForArticle}
        />
        <ArticleCard
          articles={this.props.articles}
          addVote={this.props.addVote}
          user={user}
          deleteItem={this.props.deleteItem}
        />
        <button onClick={this.props.fetchMoreArticles}>Loadmore</button>
      </>
    );
  }
  componentDidMount = () => {
    this.props.fetchArticles(this.props.topic);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.topic !== this.props.topic)
      this.props.fetchArticles(this.props.topic);

    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user))
      this.props.fetchArticles();
  };
}

export default Contents;
