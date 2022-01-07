import {
  getNotificationsStart,
  getNotificationsSuccess,
  getNotificationsFailure,
  createNotificationsStart,
  createNotificationsSuccess,
  createNotificationsFailure,
  updateNotificationsStart,
  updateNotificationsSuccess,
  updateNotificationsFailure,
  deleteNotificationsStart,
  deleteNotificationsSuccess,
  deleteNotificationsFailure
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getNotifications = async (dispatch) => {
  dispatch(getNotificationsStart());
  try {
    const { data } = await axios.get('/notifications', configNormal);
    dispatch(getNotificationsSuccess(data));
  } catch (error) {
    dispatch(getNotificationsFailure(error));
  }
};
const createNotifications = async (dispatch, notifications) => {
  dispatch(createNotificationsStart());
  try {
    const { data } = await axios.post('/notifications', notifications, configNormal);
    dispatch(createNotificationsSuccess(data));
  } catch (error) {
    dispatch(createNotificationsFailure(error));
  }
};
const updateNotifications = async (dispatch, notifications) => {
  dispatch(updateNotificationsStart());
  try {
    const { data } = await axios.put(
      `/notifications/${notifications._id}`,
      notifications,
      configNormal
    );
    dispatch(updateNotificationsSuccess(data));
  } catch (error) {
    dispatch(updateNotificationsFailure(error.response.data.message));
  }
};
const deleteNotifications = async (dispatch, notifications) => {
  dispatch(deleteNotificationsStart());
  try {
    const { data } = await axios.delete(`/notifications/${notifications}`, configNormal);
    dispatch(deleteNotificationsSuccess(data));
  } catch (error) {
    dispatch(deleteNotificationsFailure(error.response.data.message));
  }
};

export { getNotifications, createNotifications, updateNotifications, deleteNotifications };
