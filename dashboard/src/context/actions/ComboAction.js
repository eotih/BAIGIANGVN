const getComboStart = () => ({
  type: 'GET_COMBO_START'
});
const getComboSuccess = (combo) => ({
  type: 'GET_COMBO_SUCCESS',
  combo
});
const getComboFailure = (error) => ({
  type: 'GET_COMBO_FAILURE',
  error
});
const createComboStart = () => ({
  type: 'CREATE_COMBO_START'
});
const createComboSuccess = (combo) => ({
  type: 'CREATE_COMBO_SUCCESS',
  status: combo.status,
  message: combo.message,
  combo: combo.combo
});
const createComboFailure = (error) => ({
  type: 'CREATE_COMBO_FAILURE',
  error
});
const updateComboStart = () => ({
  type: 'UPDATE_COMBO_START'
});
const updateComboSuccess = (combo) => ({
  type: 'UPDATE_COMBO_SUCCESS',
  status: combo.status,
  message: combo.message,
  combo: combo.combo
});
const updateComboFailure = (error) => ({
  type: 'UPDATE_COMBO_FAILURE',
  error
});
const deleteComboStart = () => ({
  type: 'DELETE_COMBO_START'
});
const deleteComboSuccess = (combo) => ({
  type: 'DELETE_COMBO_SUCCESS',
  status: combo.status,
  message: combo.message,
  combo: combo.combo
});
const deleteComboFailure = (error) => ({
  type: 'DELETE_COMBO_FAILURE',
  error
});

export {
  getComboStart,
  getComboSuccess,
  getComboFailure,
  createComboStart,
  createComboSuccess,
  createComboFailure,
  updateComboStart,
  updateComboSuccess,
  updateComboFailure,
  deleteComboStart,
  deleteComboSuccess,
  deleteComboFailure
};
