/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const userContext = () => {
  const { user, dispatch, error, loading } = useContext(UserContext);
  return { user, dispatch, error, loading };
};
