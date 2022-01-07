/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import BankReducer from '../reducers/BankReducer';
import logger from '../logger';

const INITIAL_STATE = {
  bank: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const BankContext = createContext(INITIAL_STATE);
const BankContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(BankReducer), INITIAL_STATE);
  const { bank, status, message, loading, error } = state;
  return (
    <BankContext.Provider
      value={{
        bank,
        loading,
        status,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export { BankContext, BankContextProvider };
