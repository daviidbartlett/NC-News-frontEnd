import React, { Component } from "react";
import Northcoders_Logo from "../images/Northcoders_Logo.png";
import Northcoders_Logo_reverse from "../images/Northcoders_Logo_reverse.png";
class VoteArticle extends Component {
  render() {
    const { article_id, votes, voted } = this.props;
    return (
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
    );
  }
  handleVote = (event) => {
    const { id, alt } = event.target;
    console.log(this.props);

    if (this.props.user !== null) {
      if (+event.target.dataset.tag === 0) {
        this.props.addVote(id, alt);
      }
    } else {
      console.log("Please Login");
    }
  };
}

export default VoteArticle;
