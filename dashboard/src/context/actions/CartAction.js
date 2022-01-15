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
const createOrUpdateCartStart = () => ({
  type: 'CREATE_OR_UPDATE_CART_START'
});
const createOrUpdateCartSuccess = (cart) => ({
  type: 'CREATE_OR_UPDATE_CART_SUCCESS',
  status: cart.status,
  message: cart.message,
  cart
});
const createOrUpdateCartFailure = (error) => ({
  type: 'CREATE_OR_UPDATE_CART_FAILURE',
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
  createOrUpdateCartStart,
  createOrUpdateCartSuccess,
  createOrUpdateCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure
};
