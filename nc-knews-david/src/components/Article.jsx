import React, { Component } from "react";
import Comments from "./Comments";
import VoteArticle from "./VoteArticle";
import QueryBar from "./QueryBar";

class Article extends Component {
  render() {
    const {
      body,
      title,
      author,
      votes,
      article_id,
      voted
    } = this.props.article;
    const type = "single";
    return (
      <>
        <div id="articleCard">
          <VoteArticle
            votes={votes}
            voted={voted}
            type={type}
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
        <QueryBar
          fetchCommentsForArticle={this.props.fetchCommentsForArticle}
          fetchArticles={this.props.fetchArticles}
          article_id={article_id}
        />
        <Comments
          comments={this.props.comments}
          addVote={this.props.addVote}
          user={this.props.user}
          article_id={this.props.article_id}
          deleteItem={this.props.deleteItem}
        />
      </>
    );
  }
  componentDidMount = () => {
    this.props.fetchArticle(this.props.article_id);
    this.props.fetchCommentsForArticle(this.props.article_id);
  };
}

export default Article;
