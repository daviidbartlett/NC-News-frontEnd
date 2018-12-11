import React from "react";
import { Link } from "@reach/router";
import Northcoders_Logo from "../images/Northcoders_Logo.png";
import Northcoders_Logo_reverse from "../images/Northcoders_Logo_reverse.png";

const ArticleCard = ({ articles }) => {
  return articles.map((article) => {
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
          <img src={Northcoders_Logo} alt="upVote" id="upVote" />
          <p>{votes}</p>
          <img src={Northcoders_Logo_reverse} alt="upVote" id="downVote" />
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
};

export default ArticleCard;
