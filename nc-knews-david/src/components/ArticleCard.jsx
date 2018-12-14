import React, { Component } from "react";
import { Link } from "@reach/router";
import VoteArticle from "./VoteArticle";
import RenderDelete from "./RenderDelete";
import Delete from "./Delete";

class ArticleCard extends Component {
  render() {
    return this.props.articles.map((article) => {
      const type = "map";
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
            type={type}
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

              <RenderDelete user={this.props.user} author={author}>
                <Delete
                  article_id={article_id}
                  deleteItem={this.props.deleteItem}
                />
              </RenderDelete>
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
