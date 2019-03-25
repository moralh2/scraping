var express = require("express")
var handlebars = require("express-handlebars")

var mongoose = require("mongoose") // database orm
var axios = require("axios") // http client
var cheerio = require("cheerio") // api to traverse dom

var PORT = 3000 // default port for dev

var app = express() // init express


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Make public a static folder
app.use(express.static("public"))