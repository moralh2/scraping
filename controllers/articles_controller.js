// Import Express
var express = require("express")

// Create Router
var router = express.Router()

// Import the model
var Article = require('../models/Article')

router.get("/articles", function (request, response) {
    Article.find({})
        .then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            response.render("index", hbsObject);
        })
        .catch(function (err) {
            response.json(err);
        });
});

router.get("/articles/new", function (request, response) {
    Article.find({ saved: false })
        .then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            response.render("index", hbsObject);
        })
        .catch(function (err) {
            response.json(err);
        });
});

router.get("/articles/saved", function (request, response) {
    Article.find({ saved: true })
        .then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            response.render("index", hbsObject);
        })
        .catch(function (err) {
            response.json(err);
        });
});

module.exports = router