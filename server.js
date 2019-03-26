var express = require("express")
var handlebars = require("express-handlebars")

// ORM
var mongoose = require("mongoose")

// HTTP Client
var axios = require("axios")

// API to traverse DOM
var cheerio = require("cheerio")

// Initialize Express, set default port to 3000
var app = express()
var PORT = 3000

var db = require("./models")


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Make public a static folder
app.use(express.static("public"))

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true })

// Set variable to store news site
var newsSite = 'https://www.theatlantic.com/latest/'

// Scrape from news site
app.get("/scrape", function (req, res) {
    // Grab HTML body
    axios.get(newsSite).then(function (response) {
        // Load into Cheerio
        var $ = cheerio.load(response.data);

        // Save main div with articles list, create array with articles
        var mainArticlesList = $("div#landing div.fluid-container.body div.river-body ul.river")
        var latestArticles = mainArticlesList.children("li.article.blog-article")

        // Loop through articles
        latestArticles.each(function (i, element) {
            // Store article
            var article = {}

            // Save title, summary, thumbnail and link for each article to result object
            article.title = $(this).find("a h2.hed").text().trim()
            article.summary = $(this).find("p").text().trim()
            article.link = "https://www.theatlantic.com" + $(this).find("a").attr("href").trim()
            article.thumbnail = $(this).find("a figure img").attr("data-src")

            console.log(article)

            // Create Article
            db.Article.create(article)
                .then(function (dbArticle) { console.log(dbArticle) })
                .catch(function (err) { console.log(err) })

        })

    })
    res.send("Scrape Complete")
})

// GET for ALL Articles
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});