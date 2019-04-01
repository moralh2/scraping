const router = require("express").Router()
const articlesRoutes = require("./articles_controller")
const scrapeRoutes = require("./scrape_controller")

// Articles Routes
router.use(articlesRoutes)
// Scrape Routes
router.use(scrapeRoutes)
module.exports = router