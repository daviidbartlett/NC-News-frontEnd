import React from "react";
import VoteArticle from "./VoteArticle";
import RenderDelete from "./RenderDelete";
import Delete from "./Delete";

const Comments = ({ comments, addVote, user, article_id, deleteItem }) => {
  return comments.map((comment) => {
    const { author, comment_id, votes, created_at, body, voted } = comment;
    return (
      <div id="articleCard" key={comment.comment_id}>
        <VoteArticle
          article_id={article_id}
          votes={votes}
          type={"comment"}
          voted={voted}
          comment_id={comment_id}
          addVote={addVote}
          user={user}
        />
        <span id="articleInfo">
          <RenderDelete user={user} author={author}>
            <Delete
              article_id={article_id}
              comment_id={comment_id}
              deleteItem={deleteItem}
            />
          </RenderDelete>
          <p>{body}</p>
          <p>{author}</p>
          <p>{created_at}</p>
        </span>
      </div>
    );
  });
};

export default Comments;
