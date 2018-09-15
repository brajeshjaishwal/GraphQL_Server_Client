const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Votes = require('./vote')

const PostSchema = new Schema({
    title: String,
    description: String,
    detail: String,//all details, diagrams, goes here
    attachments: [String], //all kind of attachments
    author: Schema.Types.ObjectId,
    comments: [Schema.Types.ObjectId],
    likes: Number,
    voters: [Schema.Types.ObjectId]
})

PostSchema.methods.doVote = async function (userId, like) {
    var post = this
    //var Votes = mongoose.model('Vote')
    var result = await Votes.doVote({ userId, postId: post._id, like} )
    if(!result.alreadyVoted){
        post.voters.push(userId)
    }else if(result.message !== undefined){
        throw result.message
    }
    post.likes += result.vote.vote
    await post.save()
    return post
}

var Post = mongoose.model('Post', PostSchema)

module.exports = Post