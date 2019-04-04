var mongoose = require("mongoose")
var Schema = mongoose.Schema

var NoteSchema = new Schema({
    body: { type: String, required: true }
},
{
    versionKey: false
})

NoteSchema.pre('save', function(next) {
    console.log('3');
    next();
  });

var Note = mongoose.model("Note", NoteSchema)

module.exports = Note