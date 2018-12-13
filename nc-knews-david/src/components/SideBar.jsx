import React from "react";
import AuthSideBar from "./AuthSideBar";

const SideBar = (props) => {
  return (
    <AuthSideBar user={props.user}>
      <div id="sideBarForm">
        <h3>Welcome</h3>
        <h4>Make sure you login to make full use of this app's features.</h4>
      </div>
    </AuthSideBar>
  );
};

export default SideBar;
