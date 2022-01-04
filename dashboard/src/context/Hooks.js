/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { AccountContext } from './contexts/AccountContext';
import { NotificationsContext } from './contexts/NotificationsContext';
import { UserContext } from './contexts/UserContext';
import { NewsContext } from './contexts/NewsContext';
import { LessonContext } from './contexts/LessonContext';
import { HistoryContext } from './contexts/HistoryContext';

const accountContext = () => {
  const account = useContext(AccountContext);
  return account;
};
const notificationsContext = () => {
  const { notifications, message, dispatch, error, loading } = useContext(NotificationsContext);
  return { notifications, message, dispatch, error, loading };
};
const userContext = () => {
  const { user, dispatch, error, loading } = useContext(UserContext);
  return { user, dispatch, error, loading };
};
const newsContext = () => {
  const { news, dispatch, error, loading } = useContext(NewsContext);
  return { news, dispatch, error, loading };
};
const lessonContext = () => {
  const { lesson, dispatch, error, loading } = useContext(LessonContext);
  return { lesson, dispatch, error, loading };
};
const historyContext = () => {
  const { history, dispatch, error, loading } = useContext(HistoryContext);
  return { history, dispatch, error, loading };
};
export {
  accountContext,
  notificationsContext,
  userContext,
  lessonContext,
  newsContext,
  historyContext
};
