/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { HistoryContext } from './HistoryContext';

export const historyContext = () => {
  const { history, dispatch, error, loading } = useContext(HistoryContext);
  return { history, dispatch, error, loading };
};
