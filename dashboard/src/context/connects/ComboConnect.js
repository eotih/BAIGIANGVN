import {
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
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getCombo = async (dispatch) => {
  dispatch(getComboStart());
  try {
    const { data } = await axios.get('/combo', configNormal);
    dispatch(getComboSuccess(data));
  } catch (error) {
    dispatch(getComboFailure(error));
  }
};
const createCombo = async (dispatch, combo) => {
  dispatch(createComboStart());
  try {
    const { data } = await axios.post('/combo', combo, configNormal);
    dispatch(createComboSuccess(data));
  } catch (error) {
    dispatch(createComboFailure(error));
  }
};
const updateCombo = async (dispatch, combo) => {
  dispatch(updateComboStart());
  try {
    const { data } = await axios.put(`/combo/${combo._id}`, combo, configNormal);
    dispatch(updateComboSuccess(data));
  } catch (error) {
    dispatch(updateComboFailure(error.response.data.message));
  }
};
const deleteCombo = async (dispatch, combo) => {
  dispatch(deleteComboStart());
  try {
    const { data } = await axios.delete(`/combo/${combo}`, configNormal);
    dispatch(deleteComboSuccess(data));
  } catch (error) {
    dispatch(deleteComboFailure(error.response.data.message));
  }
};

export { getCombo, createCombo, updateCombo, deleteCombo };
