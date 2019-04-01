// Imports
var express = require("express")            // Server
var mongoose = require("mongoose")          // ORM
var exphbs = require("express-handlebars")  // Import Handlebars

// Set default port to 3000
const PORT = process.env.PORT || 3000

// Init Express, parse request body as JSON, make public a static folder
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Set up app to use Handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Import models and routes, allow server to access routes, connect to the Mongo DB
var routes = require("./controllers/")

app.use(routes)
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true })


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