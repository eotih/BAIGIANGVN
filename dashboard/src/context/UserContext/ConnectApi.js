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

const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const user = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(getUserSuccess(user.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};
const createUser = async (dispatch, user) => {
  dispatch(createUserStart());
  try {
    const newUser = await axios.post('/auth/register', user);
    dispatch(createUserSuccess(newUser.data));
  } catch (error) {
    dispatch(createUserFailure(error));
  }
};
const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const updatedUser = await axios.put(`/user/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(updateUserSuccess(updatedUser.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
const deleteUser = async (dispatch, user) => {
  dispatch(deleteUserStart());
  try {
    const deletedUser = await axios.delete(`/user/${user._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(deleteUserSuccess(deletedUser.data));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export { getUser, createUser, updateUser, deleteUser };
