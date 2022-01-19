import { combineProviders } from 'react-combine-providers';
import {
  UserContextProvider,
  LessonContextProvider,
  NewsContextProvider,
  NotificationsContextProvider,
  BankContextProvider,
  TransactionContextProvider,
  ComboContextProvider,
  CartContextProvider,
  OrderContextProvider,
  HistoryContextProvider
} from './contexts';

const providers = combineProviders();

providers.push(UserContextProvider);
providers.push(LessonContextProvider);
providers.push(NewsContextProvider);
providers.push(NotificationsContextProvider);
providers.push(HistoryContextProvider);
providers.push(BankContextProvider);
providers.push(TransactionContextProvider);
providers.push(ComboContextProvider);
providers.push(CartContextProvider);
providers.push(OrderContextProvider);
export const MasterProvider = providers.master();
