import React from "react";
import { Link } from "@reach/router";

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
          <span>upvote</span>
          <span>downvote</span>
          <p>{votes}</p>
        </span>
        <span>
          <p>
            <Link to={`/${topic}`}>{topic}</Link>
          </p>
          <p>
            <Link to={`/${topic}/${article_id}`}>{title}</Link>
          </p>
          <p>{author}</p>
          <p>{comment_count}</p>
          <p>{created_at}</p>
        </span>
      </div>
    );
  });
};

export default ArticleCard;
