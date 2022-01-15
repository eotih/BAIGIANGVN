import {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  createOrUpdateCartStart,
  createOrUpdateCartSuccess,
  createOrUpdateCartFailure,
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
const createOrUpdateCart = async (dispatch, cart) => {
  dispatch(createOrUpdateCartStart());
  try {
    const { data } = await axios.post('/cart', cart, configNormal);
    dispatch(createOrUpdateCartSuccess(data));
  } catch (error) {
    dispatch(createOrUpdateCartFailure(error));
  }
};
const deleteCart = async (dispatch, cart) => {
  dispatch(deleteCartStart());
  try {
    const { data } = await axios.delete(`/cart/${cart}`, configNormal);
    dispatch(deleteCartSuccess(data));
  } catch (error) {
    dispatch(deleteCartFailure(error));
  }
};

export { getCart, createOrUpdateCart, deleteCart };
