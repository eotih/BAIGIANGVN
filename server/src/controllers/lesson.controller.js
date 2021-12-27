const Lesson = require('../models/lesson.models');

class Lesson {
    // [GET] /lessons
    show(req, res, next) {
        Lesson.find()
            .then(lessons => {
                res.json(lessons);
            })
            .catch(next);
    }
    // [POST] /lessons
    create(req, res, next) {
        const lesson = new Lesson(req.body);
        lesson
            .save()
            .then(lesson => {
                res.json(lesson);
            })
            .catch(next);
    }
    // [PUT] /lessons/:id
    update(req, res, next) {
        Lesson.updateOne({ _id: req.params.id }, req.body)
            .then(lesson => {
                res.json(lesson);
            })
            .catch(next);
    }
    // [DELETE] /lessons/:id
    delete(req, res, next) {
        Lesson.deleteOne({ _id: req.params.id })
            .then(lesson => {
                res.json(lesson);
            })
            .catch(next);
    }
    // [GET] /lessons/:id
    getById(req, res, next) {
        Lesson.findById(req.params.id)
            .then(lesson => {
                res.json(lesson);
            })
            .catch(next);
    }
}
module.exports = new Lesson();