import axios from "axios";

const BASE_URL = "https://david-nc-knews.herokuapp.com/api/";

export const getArticles = async (topic) => {
  const URL = topic
    ? `${BASE_URL}topics/${topic}/articles`
    : `${BASE_URL}articles`;
  console.log(URL);
  const { data } = await axios.get(URL);
  return data.articles;
};
export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}topics`);
  return data.topics;
};

export const getArticle = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}articles/${article_id}`);
  console.log(data.article);
  return data.article;
};
