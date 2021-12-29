const New = require('../models/new.models');
var formidable = require('formidable');
const fs = require('fs');
class NewController {
    // [GET] /News
    show(req, res, next) {
        New.find().sort({ createdAt: -1 })
            .then(news => {
                if (news) {
                    res.status(200).json(News);
                } else {
                    res.status(404).json({
                        message: 'News not found'
                    });
                }
            })
            .catch(next);
    }
    // [POST] /News
    create(req, res, next) {
        var form = new formidable.IncomingForm();
        form.options.uploadDir = "./src/public/assets/";
        form.parse(req, function (err, fields, files) {
            const { userID, title, description, category } = fields;
            const { image } = files;
            if (!image) {
                res.status(400).json({
                    message: 'Missing image or file'
                });
            }
            else if (!userID || !title || !description || !category) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            }
            else {
                const imagePath = "./src/public/assets/images/" + category + '/' + image.originalFilename;
                // check exist folder
                if (!fs.existsSync(imagePath)) {
                    fs.mkdir(`./src/public/assets/images/${category}`, { recursive: true }, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        fs.copyFile(image.filepath, imagePath, function (err) {
                            if (err) {
                                console.log(err);
                            }
                            return ('File uploaded successfully');
                        });
                    });
                    const New = new New({
                        userID: userID,
                        title: title,
                        description: description,
                        image: `/assets/images/${category}/${image.originalFilename}`,
                        category: category,
                    });
                    const createdNew = New.save();
                    res.send({ message: 'Create New successfully', data: createdNew });
                }
                else {
                    res.status(400).json({
                        message: 'New existed'
                    });
                }
            }
        });
    }
    // [PUT] /News/:id
    update(req, res, next) {
        var form = new formidable.IncomingForm();
        form.options.uploadDir = "./src/public/assets/";
        form.parse(req, function (err, fields, files) {
            const { userID, title, description, category } = fields;
            const { image } = files;
            if (!image) {
                res.status(400).json({
                    message: 'Missing image or file'
                });
            }
            else if (!userID || !title || !description || !category) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            }
            else {
                const imagePath = "./src/public/assets/images/" + category + '/' + image.originalFilename;
                fs.copyFile(image.filepath, imagePath, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return ('File uploaded successfully');
                });
                New.findByIdAndUpdate(req.params.id, {
                    userID: userID,
                    title: title,
                    description: description,
                    image: `/assets/images/${category}/${image.originalFilename}`,
                    category: category,
                })
                    .then(New => {
                        if (New) {
                            res.status(200).json(New);
                        }
                        else {
                            res.status(400).json({
                                message: 'New not found'
                            });
                        }
                    })
                    .catch(next);
            }
        });
    }
    // [DELETE] /News/:id
    deleteNew(req, res, next) {
        // check in folder assets/ and remove file and image
        New.findById(req.params.id)
            .then(New => {
                fs.unlink(`./src/public${New.image}`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlink(`./src/public${New.link}`, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File deleted successfully');
                    });
                });
                New.remove();
                res.status(200).json({
                    message: 'Delete New successfully'
                });
            })
    }
    // [GET] /News/:id
    getById(req, res, next) {
        New.findById(req.params.id).sort({ createdAt: -1 })
            .then(New => {
                if (!New) {
                    res.status(404).json({
                        message: 'New not found'
                    });
                }
                else {
                    res.json(New);
                }
            })
            .catch(next);
    }
}
module.exports = new NewController;