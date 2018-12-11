import React, { Component } from "react";
import { Link } from "@reach/router";
import Northcoders_Logo from "../images/Northcoders_Logo.png";
import Northcoders_Logo_reverse from "../images/Northcoders_Logo_reverse.png";
import * as api from "../api";

class ArticleCard extends Component {
  state = {
    article: {},
    hasVoted: {}
  };
  render() {
    return this.props.articles.map((article) => {
      const {
        title,
        article_id,
        author,
        votes,
        comment_count,
        created_at,
        topic
      } = article;
      return (
        <div id="articleCard" key={article_id}>
          <span id="votingArea">
            <button className="voteButton" onClick={this.handleVote}>
              <img
                src={Northcoders_Logo}
                alt="upVote"
                className={
                  this.state.hasVoted[article_id] ? "submittedVote" : null
                }
                id={article_id}
              />
            </button>
            <p>{votes}</p>
            <button className="voteButton" onClick={this.handleVote}>
              <img
                src={Northcoders_Logo_reverse}
                alt="downVote"
                className={
                  this.state.hasVoted[article_id] ? "submittedVote" : null
                }
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
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.article !== this.state.article) {
      this.props.fetchArticles();
    }
  };
  handleVote = (event) => {
    const { id, alt } = event.target;
    console.log(this.state.hasVoted);
    if (!this.state.hasVoted[id]) {
      api
        .updateVote(id, alt)
        .then((article) => this.setState({ article, hasVoted: { [id]: true } }))
        .then(console.log(this.state));
    }
  };
}

export default ArticleCard;
