import { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import axios from '../constants/axios';
import { configNormal } from './ConfigHeader';

const AccountContext = createContext();
AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string,
  removeToken: PropTypes.func.isRequired
};
function AccountProvider({ children, token, removeToken }) {
  const [account, setAccount] = useState([]);
  const [user, setUser] = useState([]);
  // check invalid token jwt
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        removeToken();
      } else {
        setAccount(decoded);
        axios.get(`/user/${decoded._id}`, configNormal).then((res) => {
          setUser(res.data);
        });
      }
    }
  }, [removeToken, token]);

  return (
    <AccountContext.Provider
      value={{
        account,
        user
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
export { AccountContext, AccountProvider };
