export { getUser, createUser, updateUser, deleteUser } from './connects/UserConnect';
export { getHistory, getHistoryByID } from './connects/HistoryConnect';
export { getLesson, createLesson, updateLesson, deleteLesson } from './connects/LessonConnect';
export {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  get5News,
  destroyNews,
  restoreNews
} from './connects/NewsConnect';
export {
  getNotifications,
  createNotifications,
  updateNotifications,
  deleteNotifications
} from './connects/NotificationsConnect';
export * from './Hooks';
