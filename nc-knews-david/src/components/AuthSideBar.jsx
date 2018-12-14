import React, { Component } from "react";

class AuthSideBar extends Component {
  state = {
    slug: "",
    description: ""
  };
  render() {
    if (!this.props.user) return this.props.children;
    else
      return (
        <>
          <div id="sideBarForm">
            <h2>Welcome back {this.props.user.username}</h2>
            <img
              id="userAvatar"
              src={this.props.user.avatar_url}
              alt={this.props.user.username}
            />
          </div>

          <div id="sideBarForm">
            <h4>Want to start a new conversation? Why not add a new topic?</h4>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="slug">
                topic:
                <input
                  required
                  type="text"
                  id="slug"
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
              </label>
              <label htmlFor="description">
                description:
                <input
                  required
                  type="text"
                  id="description"
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
              </label>

              <button type="submit">Post new topic</button>
            </form>
          </div>
        </>
      );
  }
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = (event) => {
    console.log(this.props);
    event.preventDefault();
    if (this.props.user) {
      this.props.addTopic(this.state.slug, this.state.description);
      this.setState({
        comment: ""
      });
    } else alert("You need to login to use this feature!");
  };
}

export default AuthSideBar;
