const UserRouter = require('./user.routes');
const AuthRouter = require('./auth.routes');
const LessonRouter = require('./lesson.routes');
const OrderRouter = require('./order.routes');
const NewsRouter = require('./news.routes');
const NotificationsRouter = require('./notifications.routes');
const BankRouter = require('./bank.routes');
const TransactionHistoryRouter = require('./transaction_history.routes');

function route(app) {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/lesson', LessonRouter);
    app.use('/order', OrderRouter);
    app.use('/news', NewsRouter);
    app.use('/notifications', NotificationsRouter);
    app.use('/bank', BankRouter);
    app.use('/transaction_history', TransactionHistoryRouter);
}
module.exports = route;