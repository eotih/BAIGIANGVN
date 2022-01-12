import {
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
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getCart = async (dispatch) => {
  dispatch(getCartStart());
  try {
    const { data } = await axios.get('/cart', configNormal);
    dispatch(getCartSuccess(data));
  } catch (error) {
    dispatch(getCartFailure(error));
  }
};
const createCart = async (dispatch, cart) => {
  dispatch(createCartStart());
  try {
    const { data } = await axios.post('/cart', cart, configNormal);
    dispatch(createCartSuccess(data));
  } catch (error) {
    dispatch(createCartFailure(error));
  }
};
const updateCart = async (dispatch, cart) => {
  dispatch(updateCartStart());
  try {
    const { data } = await axios.put(`/cart/${cart._id}`, cart, configNormal);
    dispatch(updateCartSuccess(data));
  } catch (error) {
    dispatch(updateCartFailure(error.response.data.message));
  }
};
const deleteCart = async (dispatch, cart) => {
  dispatch(deleteCartStart());
  try {
    const { data } = await axios.delete(`/cart/${cart}`, configNormal);
    dispatch(deleteCartSuccess(data));
  } catch (error) {
    dispatch(deleteCartFailure(error.response.data.message));
  }
};

export { getCart, createCart, updateCart, deleteCart };
