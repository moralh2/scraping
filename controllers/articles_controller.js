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
            // console.log(hbsObject);

            // response.json(hbsObject);
        })
        .catch(function (err) {
            response.json(err);
        });
});

module.exports = router