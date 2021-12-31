import {
  getNewsStart,
  getNewsSuccess,
  getNewsFailure,
  createNewsStart,
  createNewsSuccess,
  createNewsFailure,
  updateNewsStart,
  updateNewsSuccess,
  updateNewsFailure,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFailure,
  restoreNewsStart,
  restoreNewsSuccess,
  restoreNewsFailure
} from './NewsAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getNews = async (dispatch) => {
  dispatch(getNewsStart());
  try {
    const news = await axios.get('/news', configNormal);
    dispatch(getNewsSuccess(news.data));
  } catch (error) {
    dispatch(getNewsFailure(error));
  }
};
const get5News = async (dispatch) => {
  dispatch(getNewsStart());
  try {
    const news = await axios.get('/news/newest', configNormal);
    dispatch(getNewsSuccess(news.data));
  } catch (error) {
    dispatch(getNewsFailure(error));
  }
};
const createNews = async (dispatch, news) => {
  dispatch(createNewsStart());
  try {
    const newPost = await axios.post('/news', news, configNormal);
    dispatch(createNewsSuccess(newPost.data));
  } catch (error) {
    dispatch(createNewsFailure(error.response.data.message));
  }
};
const updateNews = async (dispatch, news) => {
  dispatch(updateNewsStart());
  try {
    const updatedNews = await axios.put(`/news/${news._id}`, news, configNormal);
    dispatch(updateNewsSuccess(updatedNews.data));
  } catch (error) {
    dispatch(updateNewsFailure(error.response.data.message));
  }
};
const deleteNews = async (dispatch, news) => {
  dispatch(deleteNewsStart());
  try {
    const deletedNews = await axios.delete(`/news/${news}`, configNormal);
    dispatch(deleteNewsSuccess(deletedNews.data));
  } catch (error) {
    dispatch(deleteNewsFailure(error.response.data.message));
  }
};
const destroyNews = async (dispatch, news) => {
  dispatch(deleteNewsStart());
  try {
    const deletedNews = await axios.delete(`/news/${news}/delete`, configNormal);
    dispatch(deleteNewsSuccess(deletedNews.data));
  } catch (error) {
    dispatch(deleteNewsFailure(error.response.data.message));
  }
};
const restoreNews = async (dispatch, news) => {
  dispatch(restoreNewsStart());
  try {
    const deletedNews = await axios.put(`/news/${news}/restore`, configNormal);
    dispatch(restoreNewsSuccess(deletedNews.data));
  } catch (error) {
    dispatch(restoreNewsFailure(error.response.data.message));
  }
};

export { getNews, createNews, updateNews, deleteNews, get5News, destroyNews, restoreNews };
