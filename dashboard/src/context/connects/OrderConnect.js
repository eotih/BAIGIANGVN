import {
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
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const { data } = await axios.get('/order', configNormal);
    dispatch(getOrderSuccess(data));
  } catch (error) {
    dispatch(getOrderFailure(error));
  }
};
const getOrderByUser = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const { data } = await axios.get('/order/user', configNormal);
    dispatch(getOrderSuccess(data));
  } catch (error) {
    dispatch(getOrderFailure(error));
  }
};
const createOrder = async (dispatch, order) => {
  dispatch(createOrderStart());
  try {
    const { data } = await axios.post('/order', order, configNormal);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFailure(error));
  }
};
const updateOrder = async (dispatch, order) => {
  dispatch(updateOrderStart());
  try {
    const { data } = await axios.put(`/order/${order._id}`, order, configNormal);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFailure(error.response.data.message));
  }
};
const deleteOrder = async (dispatch, order) => {
  dispatch(deleteOrderStart());
  try {
    const { data } = await axios.delete(`/order/${order}`, configNormal);
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFailure(error.response.data.message));
  }
};

export { getOrder, createOrder, updateOrder, deleteOrder, getOrderByUser };
