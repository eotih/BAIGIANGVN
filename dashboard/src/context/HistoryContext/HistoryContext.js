/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import HistoryReducer from './HistoryReducer';

const INITIAL_STATE = {
  history: [],
  loading: true,
  error: null
};

const HistoryContext = createContext(INITIAL_STATE);
const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HistoryReducer, INITIAL_STATE);
  const { history, loading, error } = state;
  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
        error,
        dispatch
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryContextProvider };
