/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import NewsReducer from '../reducers/NewsReducer';
import logger from '../logger';

const INITIAL_STATE = {
  news: [],
  loading: true,
  message: null,
  error: ''
};

const NewsContext = createContext(INITIAL_STATE);
const NewsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(NewsReducer), INITIAL_STATE);
  const { news, message, loading, error } = state;
  return (
    <NewsContext.Provider
      value={{
        news,
        loading,
        message,
        error,
        dispatch
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsContextProvider };
