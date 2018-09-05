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

PostSchema.methods.userUpvoted = async function (id) {
    var post = this
    var user = await post.likedBy.filter(u => u === id)
    console.log(`in userUpvoted ${post.likedBy} ${user}`)
    return user !== undefined
}

var Post = mongoose.model('Post', PostSchema)

module.exports = Post