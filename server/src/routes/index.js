const UserRouter = require('./user.routes');
const AuthRouter = require('./auth.routes');
const LessonRouter = require('./lesson.routes');
const OrderRouter = require('./order.routes');
const NewsRouter = require('./news.routes');
const NotificationsRouter = require('./notifications.routes');
const BankRouter = require('./bank.routes');

function route(app) {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/lesson', LessonRouter);
    app.use('/order', OrderRouter);
    app.use('/news', NewsRouter);
    app.use('/notifications', NotificationsRouter);
    app.use('/bank', BankRouter);
}
module.exports = route;