const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER_START':
      return {
        order: [],
        loading: true,
        error: null
      };
    case 'GET_ORDER_SUCCESS':
      return {
        loading: false,
        order: action.order
      };
    case 'GET_ORDER_FAILURE':
      return {
        order: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_ORDER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        order: [...state.order, action.order]
      };
    case 'CREATE_ORDER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_ORDER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_ORDER_SUCCESS':
      return {
        order: state.order.map((order) => (order._id === action.order._id ? action.order : order)),
        message: action.message,
        status: action.status,
        loading: false,
        error: null
      };
    case 'UPDATE_ORDER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_ORDER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_ORDER_SUCCESS':
      return {
        order: state.order.filter((order) => order._id !== action.order._id),
        status: action.status,
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_ORDER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default OrderReducer;
