const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: String,
    content: String,
    author: Schema.Types.ObjectId,
    comments: [Schema.Types.ObjectId],
    likes: Number,
    voters: [Schema.Types.ObjectId]
})

PostSchema.methods.doVote = async function (userId, like) {
    var post = this
    var Votes = mongoose.model('Vote')
    var result = await Votes.doVote({ userId, postId: post._id, like} )
    if(!result.alreadyVoted){
        post.vote.push(userId)
    }
    else if(result.message !== undefined){
            return result.message
    }
    post.likes += result.vote
    await post.save()
    return post
}

var Post = mongoose.model('Post', PostSchema)

module.exports = Post