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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper"

mongoose.connect(MONGODB_URI)

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!")
})