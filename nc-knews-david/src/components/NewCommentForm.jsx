import React, { Component } from "react";
import * as api from "../api";

class NewCommentForm extends Component {
  state = {
    comment: ""
  };

  render() {
    return (
      <div id="sideBarForm">
        <h3>Add a comment to the article:</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="body">
            Comment:
            <input
              required
              type="text"
              id="comment"
              onChange={this.handleChange}
              value={this.state.comment}
            />
          </label>

          <button type="submit">Post comment</button>
        </form>
      </div>
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
      this.addComment();
      this.setState({
        comment: "Posted :)"
      });
    } else alert("You need to login to use this feature!");
  };
  addComment = () => {
    const {
      article_id,
      user: { user_id }
    } = this.props;
    const { comment } = this.state;
    api.postComment(article_id, comment, user_id).then(() => {
      this.setState({
        comment: ""
      });
      this.props.updateStateWithNewComment(article_id);
    });
  };
}

export default NewCommentForm;
