import {
  getBankStart,
  getBankSuccess,
  getBankFailure,
  createBankStart,
  createBankSuccess,
  createBankFailure,
  updateBankStart,
  updateBankSuccess,
  updateBankFailure,
  deleteBankStart,
  deleteBankSuccess,
  deleteBankFailure
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getBank = async (dispatch) => {
  dispatch(getBankStart());
  try {
    const { data } = await axios.get('/bank', configNormal);
    dispatch(getBankSuccess(data));
  } catch (error) {
    dispatch(getBankFailure(error));
  }
};
const createBank = async (dispatch, bank) => {
  dispatch(createBankStart());
  try {
    const { data } = await axios.post('/bank', bank, configNormal);
    dispatch(createBankSuccess(data));
  } catch (error) {
    dispatch(createBankFailure(error));
  }
};
const updateBank = async (dispatch, bank) => {
  dispatch(updateBankStart());
  try {
    const { data } = await axios.put(`/bank/${bank._id}`, bank, configNormal);
    dispatch(updateBankSuccess(data));
  } catch (error) {
    dispatch(updateBankFailure(error.response.data.message));
  }
};
const deleteBank = async (dispatch, bank) => {
  dispatch(deleteBankStart());
  try {
    const { data } = await axios.delete(`/bank/${bank}`, configNormal);
    dispatch(deleteBankSuccess(data));
  } catch (error) {
    dispatch(deleteBankFailure(error.response.data.message));
  }
};

export { getBank, createBank, updateBank, deleteBank };
