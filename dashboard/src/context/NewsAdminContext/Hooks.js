/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { NewsContext } from './NewsContext';

export const newsContext = () => {
  const { news, dispatch, error, loading } = useContext(NewsContext);
  return { news, dispatch, error, loading };
};
