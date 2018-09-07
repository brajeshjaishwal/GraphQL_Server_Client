const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: String,
    content: String,
    author: Schema.Types.ObjectId,
    comments: [Schema.Types.ObjectId],
    likes: Number,
    vote: [Schema.Types.ObjectId]
})

PostSchema.methods.doVote = async function (userId) {
    var post = this
    var vote = await post.vote.filter(v => v.userId === userId)
    
}

var Post = mongoose.model('Post', PostSchema)

module.exports = Post