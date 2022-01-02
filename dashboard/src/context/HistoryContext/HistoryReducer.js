const HistoryReducer = (state, action) => {
  switch (action.type) {
    case 'GET_HISTORY_START':
      return {
        history: [],
        loading: true,
        error: null
      };
    case 'GET_HISTORY_SUCCESS':
      return {
        loading: false,
        history: action.history
      };
    case 'GET_HISTORY_FAILURE':
      return {
        history: [],
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default HistoryReducer;
