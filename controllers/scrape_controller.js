// Imports
var express = require("express")            // Import Express
var router = express.Router()               // Create Router
var axios = require("axios")                // HTTP client
var cheerio = require("cheerio")            // API to traverse DOM
var db = require("../models")               // Import Models
const newsSite1 = 'https://www.theatlantic.com/latest/'

// Scrape GET Route
router.get("/scrape1", function (req, res) {
    // Grab HTML body
    axios.get(newsSite1).then(function (response) {
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

            // Create Article
            db.Article.create(article)
                .then(function (dbArticle) { console.log(dbArticle) })
                .catch(function (err) { console.log(err) })
        })
    })
    res.send("Scrape Complete")
})

module.exports = router