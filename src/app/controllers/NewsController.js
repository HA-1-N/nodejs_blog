class NewsController {

    // [Get] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send("newdetail")
    }
}

module.exports = new NewsController;
