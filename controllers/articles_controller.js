// Import Express
var express = require("express")
// Create Router
var router = express.Router()

// Import the models
var Article = require('../models/Article')
var Note = require('../models/Note')

var testing = false

router.get("/", function (request, response) {
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
    // Populate associated notes
    .populate("notes")
    .then(function (dbArticle) {
        var hbsObject = {
            saved: true,
            articles: dbArticle
        };

        if (testing) {
            response.json(hbsObject);
        }
        else {
            response.render("index", hbsObject);
        }
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
        response.json(dbArticle)
    })
    .catch(function(err) {
        response.json(err)
    });
  });

router.delete("/notes/:id", function (request, response) {
    Note.deleteOne({_id: request.params.id})
    .then(function(data) {
        response.json(data) 
    })
    .catch(function(err) {
        response.json(err)
    });
});

router.delete("/articles/:id", function (request, response) {
    Article.deleteOne({_id: request.params.id})
    .then(function(data) {
        response.json(data) 
    })
    .catch(function(err) {
        response.json(err)
    });
});

router.delete("/articles/", function (request, response) {
    Article.collection.drop()
    .then(function (result) {
        response.send(result)
    })
    .catch(function (err) {
        response.json(err);
    });
});




// router.get("/articles/:id/clear-notes", function (request, response) {





//     Article.findOne({ _id: request.params.id }).then((article) => {
//         article.notes.pull();
//         // article.notes = [];
//         article.save();

//     });

//     // Article.findOne({ _id: request.params.id })
//         // .then(function (dbArticle) {
//         //     let arrNoteIds = dbArticle.notes
//         //     Note.deleteMany({ _id: { $in: arrNoteIds } })
//         //         .catch(function(err) {
//         //             response.json(err)
//         //         })
//         //     return dbArticle
//         // })
//         // .then(function(dbArticle) {
//         //     return Article.findOneAndUpdate({ _id: dbArticle.id }, { $set: { notes: [] } }, { new: true })
//         // })
//         // .then(function(dbArticle) {
//         //     response.json(dbArticle)
//         // })
//         // .catch(function(err) {
//         //     response.json(err)
//         // })
// })

module.exports = router