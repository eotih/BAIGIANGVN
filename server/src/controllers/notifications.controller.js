const Notifications = require("../models/notifications.models");

class NotificationsController {
  // [GET] /users
  show(req, res, next) {
    Notifications.find()
      .sort({ createdAt: -1 })
      .then((notifications) => {
        res.status(200).json(notifications);
      })
      .catch(next);
  }
  create(req, res, next) {
    const { description, status, type, isActive } = req.body;
    if (!description || !status || !type) {
      res.status(400).json({
        message: "Please provide all the required fields",
      });
    } else {
      Notifications.create({
        description,
        status,
        type,
      })
        .then((notification) => {
          res.status(201).json({ message: "Notifications created successfully", notification });
        })
        .catch(next);
    }
  }
  // [PUT] /users/:id
  update(req, res, next) {
    Notifications.findById(req.params.id)
      .then((notification) => {
        if (!notification) {
          res.status(404).json({
            message: "Notification not found",
          });
        } else {
          const { description, status, type, isActive } = req.body;
          if (!description || !status || !type) {
            res.status(400).json({
              message: "Please provide all the required fields",
            });
          } else {
            notification.description = description;
            notification.status = status;
            notification.isActive = isActive;
            notification.type = type;
            notification
              .save()
              .then((notification) => {
                res.status(200).json({
                  message: "Notification updated successfully",
                  notification,
                });
              })
              .catch(next);
          }
        }
      })
      .catch(next);
  }
  // [DELETE] /users/:id
  async deleteNotifications(req, res, next) {
    const notification = await Notifications.findById(req.params.id);
    if (notification) {
      const deleteNotifications = await notification.remove();
      console.log(deleteNotifications);
      res.status(200).json({ message: "Notifications Deleted", notification: deleteNotifications });
    } else {
      res.status(200).json({ message: "Notifications not found" });
    }
  }
  // [GET] /users/:id
  getById(req, res, next) {
    Notifications.findById(req.params.id)
      .then((notifications) => {
        res.status(200).json(notifications);
      })
      .catch(next);
  }
}
module.exports = new NotificationsController();
