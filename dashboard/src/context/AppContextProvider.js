import { combineProviders } from 'react-combine-providers';
import {
  UserContextProvider,
  LessonContextProvider,
  NewsContextProvider,
  NotificationsContextProvider,
  BankContextProvider,
  HistoryContextProvider
} from './contexts';

const providers = combineProviders();

providers.push(UserContextProvider);
providers.push(LessonContextProvider);
providers.push(NewsContextProvider);
providers.push(NotificationsContextProvider);
providers.push(HistoryContextProvider);
providers.push(BankContextProvider);
export const MasterProvider = providers.master();
