import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import VoteArticle from "./VoteArticle";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    hasVoted: 0
  };
  render() {
    const { body, title, author, votes, article_id } = this.state.article;
    return (
      <>
        <div id="articleCard">
          <VoteArticle
            votes={votes}
            voted={this.state.hasVoted}
            article_id={article_id}
            addVote={this.props.addVote}
            user={this.props.user}
          />
          <span id="articleInfo">
            <span id="titleAuthorLine">
              <h3>{title}</h3>
              <h4>{author}</h4>
            </span>

            <p>{body}</p>
          </span>
        </div>
        <Comments comments={this.state.comments} />
      </>
    );
  }
  componentDidMount = () => {
    console.log(this.props, "props");
    this.fetchArticle();
    this.fetchCommentsForArticle();
  };

  fetchArticle = () => {
    api.getArticle(this.props.article_id).then((article) => {
      this.setState({ article });
    });
  };
  fetchCommentsForArticle = () => {
    api.getComments(this.props.article_id).then((comments) => {
      this.setState({ comments });
    });
  };
}

export default Article;
