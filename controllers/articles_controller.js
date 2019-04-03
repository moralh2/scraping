// Import Express
var express = require("express")

// Create Router
var router = express.Router()

// Import the models
var Article = require('../models/Article')
var Note = require('../models/Note')


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
                saved: false,
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
                saved: true,
                articles: dbArticle
            };
            response.render("index", hbsObject);
        })
        .catch(function (err) {
            response.json(err);
        });
});

router.get("/articles/:id", function (request, response) {
    Article.findOne({ _id: request.params.id })
        .then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            // response.render("index", hbsObject);
            response.json(hbsObject);

        })
        .catch(function (err) {
            response.json(err);
        });
});

router.put("/articles/:id", function (request, response) {
    Article.findOneAndUpdate({ _id: request.params.id }, {$set:{saved:true}}, { new: true })
        .then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            };
            // response.render("index", hbsObject);
            response.json(hbsObject);

        })
        .catch(function (err) {
            response.json(err);
        });
});

router.post("/articles/:id", function (request, response) {
    Note.create(request.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find Article and associate with the new note
        return Article.findOneAndUpdate({ _id: request.params.id }, { $push: { notes: dbNote._id } }, { new: true })
      })
      .then(function(dbArticle) {
        // If update succeeds, send back
        response.json(dbArticle);
      })
      .catch(function(err) {
        response.json(err);
      });
  });



module.exports = router