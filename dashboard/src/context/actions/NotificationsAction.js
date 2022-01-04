const getNotificationsStart = () => ({
  type: 'GET_NOTIFICATIONS_START'
});
const getNotificationsSuccess = (notifications) => ({
  type: 'GET_NOTIFICATIONS_SUCCESS',
  notifications
});
const getNotificationsFailure = (error) => ({
  type: 'GET_NOTIFICATIONS_FAILURE',
  error
});
const createNotificationsStart = () => ({
  type: 'CREATE_NOTIFICATIONS_START'
});
const createNotificationsSuccess = (notifications) => ({
  type: 'CREATE_NOTIFICATIONS_SUCCESS',
  message: notifications.message,
  notifications: notifications.notification
});
const createNotificationsFailure = (error) => ({
  type: 'CREATE_NOTIFICATIONS_FAILURE',
  error
});
const updateNotificationsStart = () => ({
  type: 'UPDATE_NOTIFICATIONS_START'
});
const updateNotificationsSuccess = (notifications) => ({
  type: 'UPDATE_NOTIFICATIONS_SUCCESS',
  message: notifications.message,
  notifications: notifications.notification
});
const updateNotificationsFailure = (error) => ({
  type: 'UPDATE_NOTIFICATIONS_FAILURE',
  error
});
const deleteNotificationsStart = () => ({
  type: 'DELETE_NOTIFICATIONS_START'
});
const deleteNotificationsSuccess = (notifications) => ({
  type: 'DELETE_NOTIFICATIONS_SUCCESS',
  message: notifications.message,
  notifications: notifications.notification
});
const deleteNotificationsFailure = (error) => ({
  type: 'DELETE_NOTIFICATIONS_FAILURE',
  error
});

export {
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
};
