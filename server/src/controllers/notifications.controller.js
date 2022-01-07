const Notifications = require("../models/notifications.models");

class NotificationsController {
  // [GET] /notifications
  show(req, res, next) {
    Notifications.find()
      .sort({ createdAt: -1 })
      .then((notifications) => {
        res.status(200).json(notifications);
      })
      .catch(next);
  }
  // [POST] /notifications
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
          if (notification) {
            res.status(200).json({ message: "Notifications created successfully", notification, status: 200 });
          }
          else {
            res.status(400).json({ message: "Notifications not created", status: 400 });
          }
        })
        .catch(next);
    }
  }
  // [PUT] /notifications/:id
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
              status: 200
            });
          } else {
            notification.description = description;
            notification.status = status;
            notification.isActive = isActive;
            notification.type = type;
            notification
              .save()
              .then((notification) => {
                if (notification) {
                  res.status(200).json({
                    message: "Notification updated successfully",
                    status: 200,
                    notification
                  });
                } else {
                  res.status(400).json({
                    message: "Notification not updated",
                    status: 400
                  });
                }
              })
              .catch(next);
          }
        }
      })
      .catch(next);
  }
  // [DELETE] /notifications/:id
  async deleteNotifications(req, res, next) {
    const notification = await Notifications.findById(req.params.id);
    if (notification) {
      const deleteNotifications = await notification.remove();
      res.status(200).json({ message: "Notifications Deleted", notification: deleteNotifications, status: 200 });
    } else {
      res.status(404).json({ message: "Notifications not found", status: 404 });
    }
  }
  // [GET] /notifications/:id
  getById(req, res, next) {
    Notifications.findById(req.params.id)
      .then((notifications) => {
        res.status(200).json(notifications);
      })
      .catch(next);
  }
}
module.exports = new NotificationsController();
