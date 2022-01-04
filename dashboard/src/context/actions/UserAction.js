const getUserStart = () => ({
  type: 'GET_USER_START'
});
const getUserSuccess = (user) => ({
  type: 'GET_USER_SUCCESS',
  user
});
const getUserFailure = (error) => ({
  type: 'GET_USER_FAILURE',
  error
});
const createUserStart = () => ({
  type: 'CREATE_USER_START'
});
const createUserSuccess = (user) => ({
  type: 'CREATE_USER_SUCCESS',
  message: user.message,
  user: user.user
});
const createUserFailure = (error) => ({
  type: 'CREATE_USER_FAILURE',
  error
});
const updateUserStart = () => ({
  type: 'UPDATE_USER_START'
});
const updateUserSuccess = (user) => ({
  type: 'UPDATE_USER_SUCCESS',
  message: user.message,
  user: user.user
});
const updateUserFailure = (error) => ({
  type: 'UPDATE_USER_FAILURE',
  error
});
const deleteUserStart = () => ({
  type: 'DELETE_USER_START'
});
const deleteUserSuccess = (user) => ({
  type: 'DELETE_USER_SUCCESS',
  message: user.message,
  user: user.user
});
const deleteUserFailure = (error) => ({
  type: 'DELETE_USER_FAILURE',
  error
});

export {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
};
