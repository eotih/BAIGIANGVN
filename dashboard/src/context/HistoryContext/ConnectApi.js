import { getHistoryStart, getHistorySuccess, getHistoryFailure } from './HistoryAction';
import axios from '../../constants/axios';
import { configNormal } from '../ConfigHeader';

const getHistory = async (dispatch) => {
  dispatch(getHistoryStart());
  try {
    const history = await axios.get('/transaction_history', configNormal);
    dispatch(getHistorySuccess(history.data));
  } catch (error) {
    dispatch(getHistoryFailure(error));
  }
};
const getHistoryByID = async (dispatch, history) => {
  dispatch(getHistoryStart());
  try {
    const newHistory = await axios.get(`/transaction_history/${history}`, configNormal);
    dispatch(getHistorySuccess(newHistory.data));
  } catch (error) {
    dispatch(getHistoryFailure(error));
  }
};

export { getHistory, getHistoryByID };
