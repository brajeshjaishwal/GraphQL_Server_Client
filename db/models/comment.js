const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: String,
    commentedBy: Schema.Types.ObjectId
})

var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment