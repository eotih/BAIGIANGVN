import { useContext } from 'react';
import { AccountContext } from './AccountContext';

export const accountContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const account = useContext(AccountContext);
  return account;
};
