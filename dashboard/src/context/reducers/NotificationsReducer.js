const NotificationsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS_START':
      return {
        notifications: [],
        loading: true,
        error: null
      };
    case 'GET_NOTIFICATIONS_SUCCESS':
      return {
        loading: false,
        notifications: action.notifications
      };
    case 'GET_NOTIFICATIONS_FAILURE':
      return {
        notifications: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_NOTIFICATIONS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_NOTIFICATIONS_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        notifications: [...state.notifications, action.notifications]
      };
    case 'CREATE_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_NOTIFICATIONS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_NOTIFICATIONS_SUCCESS':
      return {
        notifications: state.notifications.map((notifications) =>
          notifications._id === action.notifications._id ? action.notifications : notifications
        ),
        message: action.message,
        status: action.status,
        loading: false,
        error: null
      };
    case 'UPDATE_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_NOTIFICATIONS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_NOTIFICATIONS_SUCCESS':
      return {
        notifications: state.notifications.filter(
          (notifications) => notifications._id !== action.notifications._id
        ),
        loading: false,
        status: action.status,
        message: action.message,
        error: null
      };
    case 'DELETE_NOTIFICATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default NotificationsReducer;
