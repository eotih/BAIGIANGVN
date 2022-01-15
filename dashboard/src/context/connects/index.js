export { getHistory, getHistoryByID } from './HistoryConnect';
export {
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonNotInCombo
} from './LessonConnect';
export {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  get5News,
  destroyNews,
  restoreNews
} from './NewsConnect';
export {
  getNotifications,
  createNotifications,
  updateNotifications,
  deleteNotifications
} from './NotificationsConnect';
export { getUser, createUser, updateUser, deleteUser } from './UserConnect';
export { getTransaction, createTransaction, getTransactionByEmail } from './TransactionConnect';
export { getBank, createBank, updateBank, deleteBank } from './BankConnect';
export { getCombo, createCombo, updateCombo, deleteCombo } from './ComboConnect';
export { getCart, createOrUpdateCart, deleteCart } from './CartConnect';
