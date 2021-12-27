const multer = require('multer');
const express = require('express');

class UploadController {
    // upload file to server
    upload(req, res) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        const upload = multer({ storage: storage }).single('file');

        upload(req, res, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    success: true,
                    path: `/uploads/${req.file.originalname}`
                });
            }
        });
    }
}

module.exports = new UploadController();
