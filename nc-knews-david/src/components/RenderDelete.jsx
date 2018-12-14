import React, { Component } from "react";

class RenderDelete extends Component {
  render() {
    if (this.props.user && this.props.user.username === this.props.author) {
      return this.props.children;
    } else return null;
  }
}

export default RenderDelete;
