// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import Login from './pages/Login';
import useToken from './services/useToken';

import { AccountProvider } from './context/AccountContext';
import { UserContextProvider } from './context/UserContext/UserContext';
// ----------------------------------------------------------------------

export default function App() {
  const { token, removeToken } = useToken();
  if (!token) {
    return (
      <ThemeConfig>
        <Login />
      </ThemeConfig>
    );
  }
  return (
    <ThemeConfig>
      <AccountProvider removeToken={removeToken} token={token}>
        <UserContextProvider>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </UserContextProvider>
      </AccountProvider>
    </ThemeConfig>
  );
}
