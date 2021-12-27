const Lesson = require('../models/lesson.models');
var formidable = require('formidable');
const fs = require('fs');
class LessonController {
    // [GET] /lessons
    show(req, res, next) {
        Lesson.find().sort({ createdAt: -1 })
            .then(lessons => {
                res.json(lessons);
            })
            .catch(next);
    }
    // [POST] /lessons
    async create(req, res, next) {
        var form = new formidable.IncomingForm();
        form.options.uploadDir = "./src/public/assets/";
        form.parse(req, function (err, fields, files) {
            const { name, description, price, slide, week, subject, grade, category, sale } = fields;
            const { image, file } = files;
            if (!image || !file) {
                res.status(400).json({
                    message: 'Missing image or file'
                });
            }
            else if (!name || !description || !price || !slide || !week || !subject || !grade || !category) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            }
            else if (Lesson.findOne({ name: name, week: week, subject: subject, grade: grade })) {
                res.status(400).json({
                    message: 'Lesson existed'
                });
            }
            else {
                const filePath = "./src/public/assets/files/" + file.originalFilename;
                const imagePath = "./src/public/assets/images/" + image.originalFilename;
                if (fs.existsSync(filePath) || fs.existsSync(imagePath)) {
                    res.status(400).json({
                        message: 'File existed'
                    });
                }
                else {
                    fs.copyFile(file.filepath, filePath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File uploaded successfully');
                    });
                    fs.copyFile(image.filepath, imagePath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File uploaded successfully');
                    });
                    const lesson = new Lesson({
                        name: name,
                        description: description,
                        image: `/assets/images/${image.originalFilename}`,
                        price: price,
                        slide: slide,
                        sale: sale,
                        week: week,
                        subject: subject,
                        grade: grade,
                        link: `/assets/files/${file.originalFilename}`,
                        category: category,
                    });
                    const createdLesson = lesson.save();
                    res.send({ message: 'Create lesson successfully', data: createdLesson });
                }
            }
        });
    }
    // [PUT] /lessons/:id
    update(req, res, next) {
        var form = new formidable.IncomingForm();
        form.options.uploadDir = "./src/public/assets/";
        form.parse(req, function (err, fields, files) {
            const { name, description, price, slide, week, subject, grade, category } = fields;
            const { image, file } = files;
            if (!image || !file) {
                res.status(400).json({
                    message: 'Missing image or file'
                });
            }
            else if (!name || !description || !price || !slide || !week || !subject || !grade || !category) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            }
            else {
                const filePath = "./src/public/assets/files/" + file.originalFilename;
                const imagePath = "./src/public/assets/images/" + image.originalFilename;
                if (fs.existsSync(filePath) || fs.existsSync(imagePath)) {
                    res.status(400).json({
                        message: 'File existed'
                    });
                }
                else {
                    fs.copyFile(file.filepath, filePath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File uploaded successfully');
                    });
                    fs.copyFile(image.filepath, imagePath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File uploaded successfully');
                    });
                    Lesson.findByIdAndUpdate(req.params.id, {
                        name: name,
                        description: description,
                        image: `/assets/images/${image.originalFilename}`,
                        price: price,
                        slide: slide,
                        week: week,
                        sale: sale,
                        subject: subject,
                        grade: grade,
                        link: `/assets/files/${file.originalFilename}`,
                        category: category,
                    })
                        .then(lesson => {
                            res.json(lesson);
                        })
                        .catch(next);
                }
            }
        });
    }
    // [DELETE] /lessons/:id
    deleteLesson(req, res, next) {
        // check in folder assets/ and remove file and image
        Lesson.findById(req.params.id)
            .then(lesson=> {
                fs.unlink(`./src/public${lesson.image}`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlink(`./src/public${lesson.link}`, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return ('File deleted successfully');
                    });
                });
                lesson.remove();
                res.status(200).json({
                    message: 'Delete lesson successfully'
                });
            })
    }
    // [GET] /lessons/:id
    getById(req, res, next) {
        Lesson.findById(req.params.id)
            .then(lesson => {
                if(!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                }
                else {
                    res.json(lesson);
                }
            })
            .catch(next);
    }
    // [GET] /lessons/week/:id
    getByWeek(req, res, next) {
        Lesson.find({ week: req.params.id })
            .then(lesson => {
                if(!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                }
                else {
                    res.json(lesson);
                }
            })
            .catch(next);
    }
}
module.exports = new LessonController;