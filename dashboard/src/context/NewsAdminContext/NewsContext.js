/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import NewsReducer from './NewsReducer';

const INITIAL_STATE = {
  news: [],
  loading: true,
  error: null
};

const NewsContext = createContext(INITIAL_STATE);
const NewsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NewsReducer, INITIAL_STATE);
  const { news, loading, error } = state;
  return (
    <NewsContext.Provider
      value={{
        news,
        loading,
        error,
        dispatch
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsContextProvider };
