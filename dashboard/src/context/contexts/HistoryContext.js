/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import HistoryReducer from '../reducers/HistoryReducer';
import logger from '../logger';

const INITIAL_STATE = {
  history: [],
  loading: true,
  message: null,
  error: null
};

const HistoryContext = createContext(INITIAL_STATE);
const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(HistoryReducer), INITIAL_STATE);
  const { history, message, loading, error } = state;
  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryContextProvider };
