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

import { AccountProvider } from './context/contexts/AccountContext';
import { MasterProvider } from './context/AppContextProvider';
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
        <MasterProvider>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </MasterProvider>
      </AccountProvider>
    </ThemeConfig>
  );
}
