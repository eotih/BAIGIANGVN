import { useState, createContext, useEffect } from 'react';
import { infoUserLogin } from '../functions/Organization';

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [account, setAccount] = useState([]);
  useEffect(() => {
    infoUserLogin().then((res) => {
      setAccount(res);
    });
  }, []);
  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
export { AccountProvider, AccountContext };
