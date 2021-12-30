const Lesson = require('../models/lesson.models');
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
        const { name, description, price, slide, subject, grade, category, sale } = req.body;
        const lesson = await Lesson.findOne({ name: name });
        if (lesson) {
            res.status(400).json({
                message: 'Lesson already exists'
            });
        } else {
            if (!name || !description || !price || !week || !subject || !grade || !category || !sale) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            } else {
                const newLesson = new Lesson({
                    name,
                    description,
                    price,
                    week,
                    subject,
                    grade,
                    category,
                    image,
                    sale
                });
                newLesson.save()
                    .then(lesson => {
                        res.status(201).json(lesson);
                    })
                    .catch(next);
            }
        }
    }
    // [PUT] /lessons/:id
    async update(req, res, next) {
        const { name, description, price, slide, subject, grade, category, sale } = req.body;
        await Lesson.findById(req.params.id)
            .then(lesson => {
                if (!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                } else {
                    if (!name || !description || !price || !slide || !subject || !grade || !category || !sale) {
                        res.status(400).json({
                            message: 'Missing fields'
                        });
                    } else {
                        lesson.name = name;
                        lesson.description = description;
                        lesson.price = price;
                        lesson.week = week;
                        lesson.subject = subject;
                        lesson.grade = grade;
                        lesson.category = category;
                        lesson.sale = sale;
                        lesson.save()
                            .then(lesson => {
                                res.status(201).json(lesson);
                            })
                            .catch(next);
                    }
                }
            })
    }
    // [DELETE] /lessons/:id
    deleteLesson(req, res, next) {
        // check in folder assets/ and remove file and image
        Lesson.findById(req.params.id)
            .then(lesson => {
                if (!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                } else {
                    lesson.remove()
                        .then(() => {
                            res.status(200).json({
                                message: 'Lesson deleted'
                            });
                        })
                        .catch(next);
                }
            })
    }
    // [GET] /lessons/:id
    getById(req, res, next) {
        Lesson.findById(req.params.id)
            .then(lesson => {
                if (!lesson) {
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
                if (!lesson) {
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