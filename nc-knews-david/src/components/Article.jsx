import React, { Component } from "react";
import Comments from "./Comments";
import VoteArticle from "./VoteArticle";

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
    console.log(this.props, "props");
    this.props.fetchArticle(this.props.article_id);
    this.props.fetchCommentsForArticle(this.props.article_id);
  };
}

export default Article;
