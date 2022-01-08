/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import TransactionReducer from '../reducers/TransactionReducer';
import logger from '../logger';

const INITIAL_STATE = {
  transaction: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const TransactionContext = createContext(INITIAL_STATE);
const TransactionContextProvider = ({ children }) => {
  const [state, dispatchTransaction] = useReducer(logger(TransactionReducer), INITIAL_STATE);
  const { transaction, status, message, loading, error } = state;
  return (
    <TransactionContext.Provider
      value={{
        transaction,
        loading,
        status,
        message,
        error,
        dispatchTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext, TransactionContextProvider };
