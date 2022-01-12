const getCartStart = () => ({
  type: 'GET_CART_START'
});
const getCartSuccess = (cart) => ({
  type: 'GET_CART_SUCCESS',
  cart
});
const getCartFailure = (error) => ({
  type: 'GET_CART_FAILURE',
  error
});
const createCartStart = () => ({
  type: 'CREATE_CART_START'
});
const createCartSuccess = (cart) => ({
  type: 'CREATE_CART_SUCCESS',
  status: cart.status,
  message: cart.message,
  cart: cart.cart
});
const createCartFailure = (error) => ({
  type: 'CREATE_CART_FAILURE',
  error
});
const updateCartStart = () => ({
  type: 'UPDATE_CART_START'
});
const updateCartSuccess = (cart) => ({
  type: 'UPDATE_CART_SUCCESS',
  status: cart.status,
  message: cart.message,
  cart: cart.cart
});
const updateCartFailure = (error) => ({
  type: 'UPDATE_CART_FAILURE',
  error
});
const deleteCartStart = () => ({
  type: 'DELETE_CART_START'
});
const deleteCartSuccess = (cart) => ({
  type: 'DELETE_CART_SUCCESS',
  status: cart.status,
  message: cart.message,
  cart: cart.cart
});
const deleteCartFailure = (error) => ({
  type: 'DELETE_CART_FAILURE',
  error
});

export {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  createCartStart,
  createCartSuccess,
  createCartFailure,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure
};
