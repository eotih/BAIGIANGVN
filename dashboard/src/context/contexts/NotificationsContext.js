/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import NotificationsReducer from '../reducers/NotificationsReducer';
import logger from '../logger';

const INITIAL_STATE = {
  notifications: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const NotificationsContext = createContext(INITIAL_STATE);
const NotificationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(NotificationsReducer), INITIAL_STATE);
  const { notifications, status, message, loading, error } = state;
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        status,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContext, NotificationsContextProvider };
