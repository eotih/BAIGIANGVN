import {
  getTransactionStart,
  getTransactionSuccess,
  getTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure
} from '../actions';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getTransaction = async (dispatchTransaction) => {
  dispatchTransaction(getTransactionStart());
  try {
    const { data } = await axios.get('/transaction_history', configNormal);
    dispatchTransaction(getTransactionSuccess(data));
  } catch (error) {
    dispatchTransaction(getTransactionFailure(error));
  }
};
const createTransaction = async (dispatchTransaction, transaction) => {
  dispatchTransaction(createTransactionStart());
  try {
    const { data } = await axios.post('/transaction_history', transaction, configNormal);
    dispatchTransaction(createTransactionSuccess(data));
  } catch (error) {
    dispatchTransaction(createTransactionFailure(error));
  }
};
const getTransactionByEmail = async (dispatchTransaction, transaction) => {
  dispatchTransaction(getTransactionStart());
  try {
    const { data } = await axios.get(`/transaction_history${transaction}`, configNormal);
    dispatchTransaction(getTransactionSuccess(data));
  } catch (error) {
    dispatchTransaction(getTransactionFailure(error));
  }
};

export { getTransaction, createTransaction, getTransactionByEmail };
