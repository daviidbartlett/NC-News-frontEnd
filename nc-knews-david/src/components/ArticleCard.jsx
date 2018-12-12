import React, { Component } from "react";
import { Link } from "@reach/router";
import VoteArticle from "./VoteArticle";

class ArticleCard extends Component {
  render() {
    return this.props.articles.map((article) => {
      const {
        title,
        article_id,
        author,
        votes,
        comment_count,
        created_at,
        topic,
        voted
      } = article;
      return (
        <div id="articleCard" key={article_id}>
          <VoteArticle
            votes={votes}
            voted={voted}
            article_id={article_id}
            addVote={this.props.addVote}
            user={this.props.user}
          />
          <span id="articleInfo">
            <span id="titleAuthorLine">
              <p>
                <Link to={`/${topic}`}>{topic}</Link>
              </p>
              <p>{author}</p>
            </span>
            <h4>
              <Link to={`/${topic}/${article_id}`}>{title}</Link>
            </h4>
            <p>{comment_count}</p>
            <p>{created_at}</p>
          </span>
        </div>
      );
    });
  }
}

export default ArticleCard;
