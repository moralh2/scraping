// Imports
var express = require("express")            // Server
var mongoose = require("mongoose")          // ORM
var axios = require("axios")                // HTTP client
var cheerio = require("cheerio")            // API to traverse DOM
var exphbs = require("express-handlebars")  // Import Handlebars

// Set default port to 3000, set news site
const PORT = process.env.PORT || 3000
const newsSite = 'https://www.theatlantic.com/latest/'


// Init Express, parse request body as JSON, make public a static folder
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Set up app to use Handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import models and routes, allow server to access routes, connect to the Mongo DB
var db = require("./models")
var routes = require("./controllers/articles_controller")
app.use(routes);
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true })

// Scrape from news site
app.get("/scrape", function (req, res) {
    // Grab HTML body
    axios.get(newsSite).then(function (response) {
        // Load into Cheerio
        var $ = cheerio.load(response.data)

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
// app.get("/articles", function (req, res) {
//     db.Article.find({})
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!")
})