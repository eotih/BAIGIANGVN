const UserRouter = require('./user.routes');

function route(app) {
    app.use('/user', UserRouter);
}
module.exports = route;