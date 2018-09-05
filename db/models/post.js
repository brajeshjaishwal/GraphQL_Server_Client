const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: String,
    content: String,
    author: Schema.Types.ObjectId,
    comments: [Schema.Types.ObjectId],
    likes: Number,
    likedBy: [Schema.Types.ObjectId]
})

var Post = mongoose.model('Post', PostSchema)

module.exports = Post