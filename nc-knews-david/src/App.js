import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Contents from "./components/Contents";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header id="header" />
        <Nav id="navBar" />
        <SideBar id="sideBar" />
        <Contents id="contents" />
        <Footer id="footer" />
      </div>
    );
  }
}

export default App;
