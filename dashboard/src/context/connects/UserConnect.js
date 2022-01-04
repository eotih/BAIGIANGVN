import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserFailure,
  getUserStart,
  getUserSuccess
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const { data } = await axios.get('/user', configNormal);
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};
const createUser = async (dispatch, user) => {
  dispatch(createUserStart());
  try {
    const { data } = await axios.post('/auth/register', user);
    dispatch(createUserSuccess(data));
  } catch (error) {
    dispatch(createUserFailure(error.response.data.message));
  }
};
const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const { data } = await axios.put(`/user/${user._id}`, user, configNormal);
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFailure(error.response.data.message));
  }
};
const deleteUser = async (dispatch, user) => {
  dispatch(deleteUserStart());
  try {
    const { data } = await axios.delete(`/user/${user}`, configNormal);
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

export { getUser, createUser, updateUser, deleteUser };
