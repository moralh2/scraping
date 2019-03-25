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


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Make public a static folder
app.use(express.static("public"))

// Set variable to store news site
var newsSite = 'https://www.theatlantic.com/latest/'

// Scrape from news site
app.get("/scrape", function(req, res) {
    // Grab HTML body
    axios.get(newsSite).then(function(response) {
      // Load into Cheerio
      var $ = cheerio.load(response.data);

      // Save main div with articles list, create array with articles
      var mainArticlesList = $("div#landing div.fluid-container.body div.river-body ul.river")
      var latestArticles = mainArticlesList.children("li.article.blog-article")
  
      // Loop through articles
      latestArticles.each(function(i, element) {
        // Create article object
        var article = {};
  
        // Save title, summary and link for each article to result object
        article.title   = $(this).find("a h2.hed").text().trim()
        article.summary = $(this).find("p").text().trim()
        article.link    = "https://www.theatlantic.com" + $(this).find("a").attr("href").trim()

        console.log(article)         
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });