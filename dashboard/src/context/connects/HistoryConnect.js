import { getHistoryStart, getHistorySuccess, getHistoryFailure } from '../actions/HistoryAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getHistory = async (dispatch) => {
  dispatch(getHistoryStart());
  try {
    const { data } = await axios.get('/transaction_history', configNormal);
    dispatch(getHistorySuccess(data));
  } catch (error) {
    dispatch(getHistoryFailure(error));
  }
};
const getHistoryByID = async (dispatch, history) => {
  dispatch(getHistoryStart());
  try {
    const { data } = await axios.get(`/transaction_history/${history}`, configNormal);
    dispatch(getHistorySuccess(data));
  } catch (error) {
    dispatch(getHistoryFailure(error));
  }
};

export { getHistory, getHistoryByID };
