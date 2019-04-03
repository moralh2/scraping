var mongoose = require("mongoose")

// Reference to the Schema constructor
var Schema = mongoose.Schema

// Create Article schema
var ArticleSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    link: { type: String, required: true },
    thumbnail: { type: String, required: true },
    saved: { type: Boolean, required: true, default: false},
    notes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Note" 
    }]
},
{
    versionKey: false
})

// Create Article model
var Article = mongoose.model("Article", ArticleSchema)

// Export the Article model
module.exports = Article