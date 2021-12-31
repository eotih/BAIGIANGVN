const Notifications = require('../models/notifications.models');

class NotificationsController {
    // [GET] /users
    show(req, res, next) {
        Notifications.find().sort({ createdAt: -1 })
            .then(users => {
                res.json(users);
            })
            .catch(next);
    }
    create(req, res, next) {
        const { description, status, type } = req.body;
        if (!description || !status || !type) {
            res.status(400).json({
                message: 'Please provide all the required fields'
            });
        } else {
            Notifications.create({
                description,
                status,
                type
            })
                .then(notification => {
                    res.status(201).json(notification);
                })
                .catch(next);
        }
    }
    // [PUT] /users/:id
    update(req, res, next) {
        Notifications.findById(req.params.id)
            .then(notification => {
                if (!notification) {
                    res.status(404).json({
                        message: 'Notification not found'
                    });
                }
                else {
                    const { description, status, type } = req.body;
                    if (!description || !status || !type) {
                        res.status(400).json({
                            message: 'Please provide all the required fields'
                        });
                    } else {
                        notification.description = description;
                        notification.status = status;
                        notification.type = type;
                        notification.save()
                            .then(notification => {
                                res.json(notification);
                            })
                            .catch(next);
                    }
                }
            })
            .catch(next);
    }
    // [DELETE] /users/:id
    async deleteNotifications(req, res, next) {
        const Notifications = await Notifications.findById(req.params.id);
        if (Notifications) {
            const deleteNotifications = await Notifications.remove();
            res.send({ message: 'Notifications Deleted', user: deleteNotifications });
        } else {
            res.send({ message: 'Notifications not found' });
        }
    }
    // [GET] /users/:id
    getById(req, res, next) {
        Notifications.findById(req.params.id)
            .then(user => {
                res.status(200).json(Notifications);
            })
            .catch(next);
    }
}
module.exports = new NotificationsController;