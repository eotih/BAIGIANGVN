/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import LessonReducer from './LessonReducer';

const INITIAL_STATE = {
  lesson: [],
  loading: true,
  error: null
};

const LessonContext = createContext(INITIAL_STATE);
const LessonContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LessonReducer, INITIAL_STATE);
  const { lesson, loading, error } = state;
  return (
    <LessonContext.Provider
      value={{
        lesson,
        loading,
        error,
        dispatch
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export { LessonContext, LessonContextProvider };
