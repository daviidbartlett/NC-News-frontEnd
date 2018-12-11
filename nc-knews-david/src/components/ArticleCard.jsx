import React, { Component } from "react";
import { Link } from "@reach/router";
import Northcoders_Logo from "../images/Northcoders_Logo.png";
import Northcoders_Logo_reverse from "../images/Northcoders_Logo_reverse.png";

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
          <span id="votingArea">
            <button className="voteButton" onClick={this.handleVote}>
              <img
                src={Northcoders_Logo}
                alt="upVote"
                data-tag={voted}
                className={voted === 1 ? "submittedVote" : null}
                id={article_id}
              />
            </button>
            <p>{votes}</p>
            <button className="voteButton" onClick={this.handleVote}>
              <img
                src={Northcoders_Logo_reverse}
                alt="downVote"
                data-tag={voted}
                className={voted === -1 ? "submittedVote" : null}
                id={article_id}
              />
            </button>
          </span>
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

  handleVote = (event) => {
    const { id, alt } = event.target;

    if (+event.target.dataset.tag === 0) {
      this.props.addVote(id, alt);
    }
  };
}

export default ArticleCard;
