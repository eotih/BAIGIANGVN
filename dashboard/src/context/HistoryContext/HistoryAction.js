const getHistoryStart = () => ({
  type: 'GET_HISTORY_START'
});
const getHistorySuccess = (history) => ({
  type: 'GET_HISTORY_SUCCESS',
  history
});
const getHistoryFailure = (error) => ({
  type: 'GET_HISTORY_FAILURE',
  error
});

export { getHistoryStart, getHistorySuccess, getHistoryFailure };
