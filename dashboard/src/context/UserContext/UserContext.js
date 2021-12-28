/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';

const INITIAL_STATE = {
  user: [],
  loading: true,
  error: null
};

const UserContext = createContext(INITIAL_STATE);
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const { user, loading, error } = state;
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        dispatch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
