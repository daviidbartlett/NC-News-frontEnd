import React from "react";

const AuthSideBar = ({ user, children }) => {
  if (!user) return children;
  else
    return (
      <div id="sideBarForm">
        <h1>Welcome back {user.username}</h1>
        <img id="userAvatar" src={user.avatar_url} alt={user.username} />
      </div>
    );
};

export default AuthSideBar;
