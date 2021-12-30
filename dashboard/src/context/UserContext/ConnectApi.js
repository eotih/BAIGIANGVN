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
} from './UserAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const user = await axios.get('/user', configNormal);
    dispatch(getUserSuccess(user.data));
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};
const createUser = async (dispatch, user) => {
  dispatch(createUserStart());
  try {
    const newUser = await axios.post('/auth/register', user);
    dispatch(createUserSuccess(newUser.data));
  } catch (error) {
    dispatch(createUserFailure(error.response.data.message));
  }
};
const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const updatedUser = await axios.put(`/user/${user._id}`, user, configNormal);
    dispatch(updateUserSuccess(updatedUser.data));
  } catch (error) {
    dispatch(updateUserFailure(error.response.data.message));
  }
};
const deleteUser = async (dispatch, user) => {
  dispatch(deleteUserStart());
  try {
    const deletedUser = await axios.delete(`/user/${user}`, configNormal);
    dispatch(deleteUserSuccess(deletedUser.data));
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

export { getUser, createUser, updateUser, deleteUser };
