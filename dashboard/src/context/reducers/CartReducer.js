const CartReducer = (state, action) => {
  console.log('state', state);
  console.log('action', action);
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
    case 'CREATE_OR_UPDATE_CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'CREATE_OR_UPDATE_CART_SUCCESS':
      return {
        loading: false,
        status: action.status,
        message: action.message,
        cart: action.cart.createdCart
          ? [...state.cart, action.cart.createdCart]
          : state.cart.map((cart) =>
              cart._id === action.cart.updatedCart._id ? action.cart.updatedCart : cart
            )
      };
    case 'CREATE_OR_UPDATE_CART_FAILURE':
      return {
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
