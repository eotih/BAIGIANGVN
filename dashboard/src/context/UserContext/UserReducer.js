const UserReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_START':
      return {
        user: [],
        loading: true,
        error: null
      };
    case 'GET_USER_SUCCESS':
      return {
        loading: false,
        user: action.user
      };
    case 'GET_USER_FAILURE':
      return {
        user: [],
        loading: false,
        error: 'Error getting user'
      };
    case 'CREATE_USER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_USER_SUCCESS':
      return {
        loading: false,
        user: [...state.user, action.user]
      };
    case 'CREATE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_USER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_USER_SUCCESS':
      return {
        user: state.user.map((user) => (user._id === action.user._id ? action.user : user)),
        loading: false,
        error: null
      };
    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Error updating user'
      };
    case 'DELETE_USER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_USER_SUCCESS':
      return {
        user: state.user.filter((user) => user._id !== action.user.user._id),
        loading: false,
        error: null
      };
    case 'DELETE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Error deleting user'
      };
    default:
      return state;
  }
};
export default UserReducer;
