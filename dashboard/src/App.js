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
import { UserContextProvider } from './context/contexts/UserContext';
import { LessonContextProvider } from './context/contexts/LessonContext';
import { NewsContextProvider } from './context/contexts/NewsContext';
import { NotificationsContextProvider } from './context/contexts/NotificationsContext';
import { HistoryContextProvider } from './context/contexts/HistoryContext';
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
                <NotificationsContextProvider>
                  <ScrollToTop />
                  <GlobalStyles />
                  <BaseOptionChartStyle />
                  <Router />
                </NotificationsContextProvider>
              </HistoryContextProvider>
            </NewsContextProvider>
          </LessonContextProvider>
        </UserContextProvider>
      </AccountProvider>
    </ThemeConfig>
  );
}
