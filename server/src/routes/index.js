const UserRouter = require('./user.routes');
const AuthRouter = require('./auth.routes');
const LessonRouter = require('./lesson.routes');
const OrderRouter = require('./order.routes');

function route(app) {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/lesson', LessonRouter);
    app.use('/order', OrderRouter);
}
module.exports = route;