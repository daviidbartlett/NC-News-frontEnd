import React from "react";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return <div id="articleCard">{comment.body}</div>;
      })}
    </>
  );
};

export default Comments;
