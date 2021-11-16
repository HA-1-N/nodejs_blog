const Course = require('../modles/Courses');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class SiteController {

    // [Get] /
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;
