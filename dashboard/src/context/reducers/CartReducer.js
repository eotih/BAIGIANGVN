const CartReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART_START':
      return {
        cart: [],
        loading: true,
        error: null
      };
    case 'GET_CART_SUCCESS':
      return {
        loading: false,
        cart: action.cart
      };
    case 'GET_CART_FAILURE':
      return {
        cart: [],
        loading: false,
        error: action.error
      };
    case 'CREATE_CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_CART_SUCCESS':
      return {
        loading: false,
        message: action.message,
        status: action.status,
        cart: [...state.cart, action.cart]
      };
    case 'CREATE_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'UPDATE_CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'UPDATE_CART_SUCCESS':
      return {
        cart: state.cart.map((cart) => (cart._id === action.cart._id ? action.cart : cart)),
        message: action.message,
        status: action.status,
        loading: false,
        error: null
      };
    case 'UPDATE_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'DELETE_CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'DELETE_CART_SUCCESS':
      return {
        cart: state.cart.filter((cart) => cart._id !== action.cart._id),
        status: action.status,
        message: action.message,
        loading: false,
        error: null
      };
    case 'DELETE_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default CartReducer;
