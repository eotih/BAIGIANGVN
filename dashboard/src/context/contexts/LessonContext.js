/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import LessonReducer from '../reducers/LessonReducer';
import logger from '../logger';

const INITIAL_STATE = {
  lesson: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const LessonContext = createContext(INITIAL_STATE);
const LessonContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(LessonReducer), INITIAL_STATE);
  const { lesson, status, message, loading, error } = state;
  return (
    <LessonContext.Provider
      value={{
        lesson,
        status,
        loading,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export { LessonContext, LessonContextProvider };
