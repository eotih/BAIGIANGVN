const NewReducer = (state, action) => {
  switch (action.type) {
    case 'GET_NEWS_START':
      return {
        news: [],
        loading: true,
        error: null
      };
    case 'GET_NEWS_SUCCESS':
      return {
        loading: false,
        news: action.news
      };
    case 'GET_NEWS_FAILURE':
      return {
        news: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_NEWS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_NEWS_SUCCESS':
      return {
        loading: false,
        message: action.message,
        news: [...state.news, action.news]
      };
    case 'CREATE_NEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_NEWS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_NEWS_SUCCESS':
      return {
        news: state.news.map((news) => (news._id === action.news._id ? action.news : news)),
        message: action.message,
        loading: false,
        error: null
      };
    case 'UPDATE_NEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_NEWS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_NEWS_SUCCESS':
      return {
        news: state.news.filter((news) => news._id !== action.news.news._id),
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_NEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'RESTORE_NEWS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'RESTORE_NEWS_SUCCESS':
      return {
        news: [...state.news, action.news],
        message: action.message,
        loading: false,
        error: null
      };
    case 'RESTORE_NEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default NewReducer;
