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
} from '../actions/NewsAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getNews = async (dispatch) => {
  dispatch(getNewsStart());
  try {
    const { data } = await axios.get('/news', configNormal);
    dispatch(getNewsSuccess(data));
  } catch (error) {
    dispatch(getNewsFailure(error));
  }
};
const get5News = async (dispatch) => {
  dispatch(getNewsStart());
  try {
    const { data } = await axios.get('/news/newest', configNormal);
    dispatch(getNewsSuccess(data));
  } catch (error) {
    dispatch(getNewsFailure(error));
  }
};
const createNews = async (dispatch, news) => {
  dispatch(createNewsStart());
  try {
    axios
      .post('/news', news, configNormal)
      .then((response) => {
        dispatch(createNewsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createNewsFailure(error.response.data.message));
      });
  } catch (error) {
    dispatch(createNewsFailure(error.response.data.message));
  }
};
const updateNews = async (dispatch, news) => {
  dispatch(updateNewsStart());
  try {
    const { data } = await axios.put(`/news/${news._id}`, news, configNormal);
    dispatch(updateNewsSuccess(data));
  } catch (error) {
    dispatch(updateNewsFailure(error.response.data.message));
  }
};
const deleteNews = async (dispatch, news) => {
  dispatch(deleteNewsStart());
  try {
    const { data } = await axios.delete(`/news/${news}`, configNormal);
    dispatch(deleteNewsSuccess(data));
  } catch (error) {
    dispatch(deleteNewsFailure(error.response.data.message));
  }
};
const destroyNews = async (dispatch, news) => {
  dispatch(deleteNewsStart());
  try {
    const { data } = await axios.delete(`/news/${news}/delete`, configNormal);
    dispatch(deleteNewsSuccess(data));
  } catch (error) {
    dispatch(deleteNewsFailure(error.response.data.message));
  }
};
const restoreNews = async (dispatch, news) => {
  dispatch(restoreNewsStart());
  try {
    const { data } = await axios.put(`/news/${news}/restore`, configNormal);
    dispatch(restoreNewsSuccess(data));
  } catch (error) {
    dispatch(restoreNewsFailure(error.response.data.message));
  }
};

export { getNews, createNews, updateNews, deleteNews, get5News, destroyNews, restoreNews };
