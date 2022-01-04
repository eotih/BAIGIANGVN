/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import UserReducer from '../reducers/UserReducer';
import logger from '../logger';

const INITIAL_STATE = {
  user: [],
  loading: true,
  message: null,
  error: null
};

const UserContext = createContext(INITIAL_STATE);
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(UserReducer), INITIAL_STATE);
  const { user, message, loading, error } = state;
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
