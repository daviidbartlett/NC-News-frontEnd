import React, { Component } from "react";
import * as api from "../api";

class NewArticleForm extends Component {
  state = {
    title: "",
    body: ""
  };

  render() {
    return (
      <div>
        <h3>Add an article to {this.props.topics} topic:</h3>
        <form onSubmit={this.handleSubmit}>
          <label forHTML="title">
            Article title:
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </label>
          <label forHTML="title">
            Article body:
            <input
              type="text"
              id="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </label>
          <button type="submit">Add task</button>
        </form>
      </div>
    );
  }
  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.user) {
      this.addNewArticle();
      this.setState({
        title: "Your article has",
        body: "been submitted:)"
      });
    }
  };
  addNewArticle = () => {
    api
      .postNewArticle(
        this.props.topic,
        this.state.title,
        this.state.body,
        this.props.user.user_id
      )
      .then(() => {
        this.setState({
          title: "",
          body: ""
        });
        this.props.updateStateWithNewArticle(this.props.topic);
      });
  };
}

export default NewArticleForm;
