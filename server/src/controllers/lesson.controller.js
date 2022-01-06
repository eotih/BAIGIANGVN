const Lesson = require('../models/lesson.models');
class LessonController {
    // [GET] /lessons
    show(req, res, next) {
        Lesson.find().sort({ createdAt: -1 })
            .then((lessons) => {
                res.status(200).json(lessons);
            })
            .catch(next);
    }
    // [POST] /lessons
    async create(req, res, next) {
        const { name, description, price, week, subject, grade, category, sale } = req.body;
        const lesson = await Lesson.findOne({ name: name });
        if (lesson) {
            res.status(400).json({
                message: 'Lesson already exists',
                status: 400
            });
        } else {
            if (!name || !description || !price || !week || !subject || !grade || !category || !sale) {
                res.status(400).json({
                    message: 'Missing fields',
                    status: 400
                });
            } else {
                const newLesson = new Lesson(req.body);
                newLesson.save()
                    .then((lesson) => {
                        if (lesson) {
                            res.status(201).json({
                                message: 'Lesson created successfully',
                                status: 200,
                                lesson
                            });
                        }
                        else {
                            res.status(400).json({
                                message: 'Lesson not created',
                                status: 400
                            });
                        }
                    })
                    .catch(next);
            }
        }
    }
    // [PUT] /lessons/:id
    async update(req, res, next) {
        const { name, description, price, week, subject, grade, category, sale } = req.body;
        await Lesson.findById(req.params.id)
            .then(lesson => {
                if (!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                } else {
                    // if (!name || !description || !price || !week || !subject || !grade || !category || !sale) {
                    //     res.status(400).json({
                    //         message: 'Missing fields'
                    //     });
                    // } else {
                    lesson.name = name;
                    lesson.description = description;
                    lesson.price = price;
                    lesson.week = week;
                    lesson.subject = subject;
                    lesson.grade = grade;
                    lesson.category = category;
                    lesson.sale = sale;
                    lesson.save()
                        .then((lesson) => {
                            if (lesson) {
                                res.status(201).json({
                                    message: 'Lesson updated successfully',
                                    status: 200,
                                    lesson
                                });
                            } else {
                                res.status(400).json({
                                    message: 'Lesson not updated',
                                    status: 400
                                });
                            }
                        })
                        .catch(next);
                    // }
                }
            })
    }
    // [DELETE] /lessons/:id
    async deleteLesson(req, res, next) {
        const lesson = await Lesson.findById(req.params.id);
        if (lesson) {
            const deleteLesson = await lesson.remove();
            res.status(201).json({ message: 'Lesson Deleted', lesson: deleteLesson });
        } else {
            res.status(404).json({ message: 'Lesson not found', status: 404 });
        }
    }
    // [GET] /lessons/:id
    getById(req, res, next) {
        Lesson.findById(req.params.id)
            .then((lesson) => {
                if (!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                }
                else {
                    res.status(201).json(lesson);
                }
            })
            .catch(next);
    }
    // [GET] /lessons/week/:id
    getByWeek(req, res, next) {
        Lesson.find({ week: req.params.id })
            .then((lesson) => {
                if (!lesson) {
                    res.status(404).json({
                        message: 'Lesson not found'
                    });
                }
                else {
                    res.status(201).json(lesson);
                }
            })
            .catch(next);
    }
}
module.exports = new LessonController;