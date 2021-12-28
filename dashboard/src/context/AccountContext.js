import { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

const AccountContext = createContext();
AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string,
  removeToken: PropTypes.func.isRequired
};
function AccountProvider({ children, token, removeToken }) {
  const [account, setAccount] = useState([]);
  // check invalid token jwt
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        removeToken();
      } else {
        setAccount(decoded);
      }
    }
  }, [removeToken, token]);

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
export { AccountContext, AccountProvider };
