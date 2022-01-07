/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { AccountContext } from './contexts/AccountContext';
import { NotificationsContext } from './contexts/NotificationsContext';
import { UserContext } from './contexts/UserContext';
import { NewsContext } from './contexts/NewsContext';
import { LessonContext } from './contexts/LessonContext';
import { HistoryContext } from './contexts/HistoryContext';
import { BankContext } from './contexts/BankContext';

const accountContext = () => {
  const account = useContext(AccountContext);
  return account;
};
const notificationsContext = () => {
  const { notifications, status, message, dispatch, error, loading } =
    useContext(NotificationsContext);
  return { notifications, status, message, dispatch, error, loading };
};
const userContext = () => {
  const { user, status, dispatch, message, error, loading } = useContext(UserContext);
  return { user, status, dispatch, message, error, loading };
};
const newsContext = () => {
  const { news, status, dispatch, message, error, loading } = useContext(NewsContext);
  return { news, status, dispatch, message, error, loading };
};
const lessonContext = () => {
  const { lesson, status, dispatch, message, error, loading } = useContext(LessonContext);
  return { lesson, status, dispatch, message, error, loading };
};
const historyContext = () => {
  const { history, dispatch, message, error, loading } = useContext(HistoryContext);
  return { history, dispatch, message, error, loading };
};
const bankContext = () => {
  const { bank, status, dispatch, message, error, loading } = useContext(BankContext);
  return { bank, status, dispatch, message, error, loading };
};
export {
  accountContext,
  notificationsContext,
  userContext,
  lessonContext,
  newsContext,
  bankContext,
  historyContext
};
