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
  news
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
  news
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
  news
});
const deleteNewsFailure = (error) => ({
  type: 'DELETE_NEWS_FAILURE',
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
  deleteNewsFailure
};
