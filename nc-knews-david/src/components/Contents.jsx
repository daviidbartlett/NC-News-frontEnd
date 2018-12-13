import React, { Component } from "react";
import ArticleCard from "./ArticleCard";

class Contents extends Component {
  render() {
    const { user } = this.props;
    return (
      <ArticleCard
        articles={this.props.articles}
        addVote={this.props.addVote}
        user={user}
        deleteItem={this.props.deleteItem}
      />
    );
  }
  componentDidMount = () => {
    this.props.fetchArticles(this.props.topic);
  };
  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.topic !== this.props.topic)
  //     this.props.fetchArticles(this.props.topic);

  //   if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user))
  //     this.props.fetchArticles();
  // };
}

export default Contents;
