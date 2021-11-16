const Course = require('../modles/Courses');
const { mongooseToObject } = require('../../util/mongoose');


class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {

        Course.findOne({ slug: req.params.name })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {

        res.render('courses/create');
    }
    // [Post] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg?s…EIYAXABwAEG&rs=AOn4CLCQA6bGJdbGn9ZgO5xRaJUbiLVgDA`

        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);

    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [GET] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [delete] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATH] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handleFormActions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default: res.json({ message: 'Actions is invalid!' });
                break;
        }
    }
}

//Get, post, put patch, delete, options, head

module.exports = new CourseController;
