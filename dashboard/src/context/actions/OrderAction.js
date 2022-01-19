const getOrderStart = () => ({
  type: 'GET_ORDER_START'
});
const getOrderSuccess = (order) => ({
  type: 'GET_ORDER_SUCCESS',
  order
});
const getOrderFailure = (error) => ({
  type: 'GET_ORDER_FAILURE',
  error
});
const createOrderStart = () => ({
  type: 'CREATE_ORDER_START'
});
const createOrderSuccess = (order) => ({
  type: 'CREATE_ORDER_SUCCESS',
  status: order.status,
  message: order.message,
  order: order.order
});
const createOrderFailure = (error) => ({
  type: 'CREATE_ORDER_FAILURE',
  error
});
const updateOrderStart = () => ({
  type: 'UPDATE_ORDER_START'
});
const updateOrderSuccess = (order) => ({
  type: 'UPDATE_ORDER_SUCCESS',
  message: order.message,
  status: order.status,
  order: order.order
});
const updateOrderFailure = (error) => ({
  type: 'UPDATE_ORDER_FAILURE',
  error
});
const deleteOrderStart = () => ({
  type: 'DELETE_ORDER_START'
});
const deleteOrderSuccess = (order) => ({
  type: 'DELETE_ORDER_SUCCESS',
  message: order.message,
  status: order.status,
  order: order.order
});
const deleteOrderFailure = (error) => ({
  type: 'DELETE_ORDER_FAILURE',
  error
});
export {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure
};
