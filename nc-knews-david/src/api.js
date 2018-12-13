import axios from "axios";

const BASE_URL = "https://david-nc-knews.herokuapp.com/api/";

export const getArticles = async (topic) => {
  const URL = topic
    ? `${BASE_URL}topics/${topic}/articles`
    : `${BASE_URL}articles`;
  console.log(URL);
  const { data } = await axios.get(URL);
  console.log(data.articles);
  return data.articles;
};
export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}topics`);
  return data.topics;
};

export const getArticle = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}articles/${article_id}`);

  return data.article;
};

export const updateArticleVote = async (article_id, voteType) => {
  const voteObj = {
    inc_votes: voteType
  };
  const { data } = await axios.patch(
    `${BASE_URL}articles/${article_id}`,
    voteObj
  );
  console.log(data.article);
  return data.article;
};
export const updateCommentVote = async (article_id, voteType, comment_id) => {
  console.log(article_id, voteType, comment_id);
  const voteObj = { inc_votes: voteType };
  const { data } = await axios.patch(
    `${BASE_URL}articles/${article_id}/comments/${comment_id}`,
    voteObj
  );
  console.log(data.comment);
  return data.comment;
};

export const checkUsername = async (username) => {
  const { data } = await axios.get(`${BASE_URL}users/${username}`);

  if (data.user) return data.user;
  return data.msg;
};

export const getComments = async (id) => {
  const { data } = await axios.get(`${BASE_URL}articles/${id}/comments`);
  return data.comments;
};

export const postNewArticle = async (topic, title, body, user_id) => {
  const articleObj = { title: title, body: body, user_id: user_id };
  const { data } = await axios.post(
    `${BASE_URL}topics/${topic}/articles`,
    articleObj
  );
  return data.article;
};
export const postComment = async (article_id, body, user_id) => {
  const commentObj = { user_id: user_id, body: body };
  const { data } = await axios.post(
    `${BASE_URL}articles/${article_id}/comments`,
    commentObj
  );
  console.log(data.comment);
};
export const deleteData = async (article_id, comment_id) => {
  if (comment_id) {
    const { data } = await axios.delete(
      `${BASE_URL}articles/${article_id}/comments/${comment_id}`
    );
    return data.article;
  } else {
    const { data } = await axios.delete(`${BASE_URL}articles/${article_id}`);
    console.log(data.article);
    return data.article;
  }
};
