import React, { Component } from "react";

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
    if (this.props.user) {
      event.preventDefault();
      this.props.addNewArticle(
        this.props.topic,
        this.state.title,
        this.state.body
      );
    }
  };
}

export default NewArticleForm;
