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
import { UserContextProvider } from './context/UserAdminContext/UserContext';
import { LessonContextProvider } from './context/LessonAdminContext/LessonContext';
import { NewsContextProvider } from './context/NewsAdminContext/NewsContext';
import { HistoryContextProvider } from './context/HistoryContext/HistoryContext';
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
          <LessonContextProvider>
            <NewsContextProvider>
              <HistoryContextProvider>
                <ScrollToTop />
                <GlobalStyles />
                <BaseOptionChartStyle />
                <Router />
              </HistoryContextProvider>
            </NewsContextProvider>
          </LessonContextProvider>
        </UserContextProvider>
      </AccountProvider>
    </ThemeConfig>
  );
}
