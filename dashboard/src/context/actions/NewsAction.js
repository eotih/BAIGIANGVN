const getNewsStart = () => ({
  type: 'GET_NEWS_START'
});
const getNewsSuccess = (news) => ({
  type: 'GET_NEWS_SUCCESS',
  news
});
const getNewsFailure = (error) => ({
  type: 'GET_NEWS_FAILURE',
  error
});
const createNewsStart = () => ({
  type: 'CREATES_NEW_START'
});
const createNewsSuccess = (news) => ({
  type: 'CREATE_NEWS_SUCCESS',
  message: news.message,
  news: news.news
});
const createNewsFailure = (error) => ({
  type: 'CREATE_NEWS_FAILURE',
  error
});
const updateNewsStart = () => ({
  type: 'UPDATE_NEWS_START'
});
const updateNewsSuccess = (news) => ({
  type: 'UPDATE_NEWS_SUCCESS',
  message: news.message,
  news: news.news
});
const updateNewsFailure = (error) => ({
  type: 'UPDATE_NEWS_FAILURE',
  error
});
const deleteNewsStart = () => ({
  type: 'DELETE_NEWS_START'
});
const deleteNewsSuccess = (news) => ({
  type: 'DELETE_NEWS_SUCCESS',
  message: news.message,
  news: news.news
});
const deleteNewsFailure = (error) => ({
  type: 'DELETE_NEWS_FAILURE',
  error
});
const restoreNewsStart = () => ({
  type: 'RESTORE_NEWS_START'
});
const restoreNewsSuccess = (news) => ({
  type: 'RESTORE_NEWS_SUCCESS',
  message: news.message,
  news: news.news
});
const restoreNewsFailure = (error) => ({
  type: 'RESTORE_NEWS_FAILURE',
  error
});

export {
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
};
