const Lesson = require('../models/lesson.models');
const Combo = require('../models/combo.models');
class LessonController {
    // [GET] /lesson
    show(req, res, next) {
        Lesson.find().sort({ createdAt: -1 })
            .then((lessons) => {
                res.status(200).json(lessons);
            })
            .catch(next);
    }
    // [POST] /lesson
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
                            res.status(200).json({
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
    // [PUT] /lesson/:id
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
                                res.status(200).json({
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
    // [DELETE] /lesson/:id
    async deleteLesson(req, res, next) {
        const lesson = await Lesson.findById(req.params.id);
        if (lesson) {
            const deleteLesson = await lesson.remove();
            res.status(200).json({ message: 'Lesson Deleted', lesson: deleteLesson, status: 200 });
        } else {
            res.status(404).json({ message: 'Lesson not found', status: 404 });
        }
    }
    // [GET] /lesson/:id
    getById(req, res, next) {
        Lesson.findById(req.params.id)
            .then((lesson) => {
                res.status(200).json(lesson);
            })
            .catch(next);
    }
    // [GET] /lesson/week/:id
    getByWeek(req, res, next) {
        Lesson.find({ week: req.params.id })
            .then((lesson) => {
                res.status(200).json(lesson);
            })
            .catch(next);
    }
    // [GET] /lesson/not-in
    async getLessonNotInCombo(req, res, next) {
        const combo = await Combo.find();
        const comboList = combo.map(combo => combo.lessons);
        const comboIdList = comboList.reduce((acc, cur) => acc.concat(cur), []);
        Lesson.find({ _id: { $nin: comboIdList } })
            .then((lessons) => {
                res.status(200).json(lessons);
            })
            .catch(next);

    }
}
module.exports = new LessonController;