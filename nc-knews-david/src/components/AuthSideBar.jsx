import React from "react";

const AuthSideBar = ({ user, children }) => {
  if (!user) return children;
  else return <h1>Welcome back {user.username}</h1>;
};

export default AuthSideBar;
