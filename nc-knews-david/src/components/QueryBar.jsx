import React, { Component } from "react";

class QueryBar extends Component {
  state = {
    query: "",
    limit: "",
    p: 1
  };
  render() {
    return (
      <div id="querySection">
        <form onSubmit={this.handleSubmit}>
          <select
            value={this.state.query}
            id="query"
            onChange={this.handleChange}
          >
            <option value="">date new to old</option>
            <option value="sort_ascending=true">date old to new</option>
            <option value="sort_by=votes">most popular</option>
          </select>
          <select
            value={this.state.limit}
            id="limit"
            onChange={this.handleChange}
          >
            <option value="">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <button>sort</button>
        </form>
      </div>
    );
  }

  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value }, console.log(this.state));
  };
  handleSubmit = (event) => {
    console.log(this.props.article_id);
    event.preventDefault();
    if (!this.props.article_id) {
      console.log(limit, "limit");
      const limit = this.state.limit !== "" ? `&limit=${this.state.limit}` : "";
      this.props.fetchArticles(this.props.topic, `${this.state.query}${limit}`);
    } else {
      const limit = this.state.limit !== "" ? `&limit=${this.state.limit}` : "";
      this.props.fetchCommentsForArticle(
        this.props.article_id,
        `${this.state.query}${limit}`
      );
    }
  };
}

export default QueryBar;
