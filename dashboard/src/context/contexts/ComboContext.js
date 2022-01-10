/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import ComboReducer from '../reducers/ComboReducer';
import logger from '../logger';

const INITIAL_STATE = {
  combo: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const ComboContext = createContext(INITIAL_STATE);
const ComboContextProvider = ({ children }) => {
  const [state, dispatchCombo] = useReducer(logger(ComboReducer), INITIAL_STATE);
  const { combo, status, message, loading, error } = state;
  return (
    <ComboContext.Provider
      value={{
        combo,
        loading,
        status,
        message,
        error,
        dispatchCombo
      }}
    >
      {children}
    </ComboContext.Provider>
  );
};

export { ComboContext, ComboContextProvider };
