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
            console.log(hbsObject);
            response.render("index", hbsObject);
            // res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;