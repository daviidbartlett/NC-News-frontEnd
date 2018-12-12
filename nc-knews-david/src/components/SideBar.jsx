import React from "react";
import AuthSideBar from "./AuthSideBar";

const SideBar = (props) => {
  return (
    <AuthSideBar user={props.user}>
      <h3>Welcome</h3>
      <h4>
        Make sure you login in to make make full use of this app's features.
      </h4>
    </AuthSideBar>
  );
};

export default SideBar;
