import { accountContext } from '../context/Hooks';

const isAdmin = () => {
  const account = accountContext();
  if (account.isAdmin === true) {
    return true;
  }
  return false;
};
export default isAdmin;
