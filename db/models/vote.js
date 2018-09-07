const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteSchema = new Schema({
    postId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    vote: Number,
    upVoted: Boolean,
    downVoted: Boolean,
})

VoteSchema.statics.doVote = async function (userId, postId, like) {
    var tempVote = like ? 1 : -1;
    var voteModel = mongoose.model('Vote')
    var UserModel = mongoose.model('User')
    var user = UserModel.findById(userId)
    var vote = voteModel.findOne({ postId, userId })

    if(vote === undefined) {
        //no voting done on this post by this user
        vote = Vote({
            postId,
            userId,
            vote,
            upVoted: like,
            downVoted: like,
        })
        vote.save()
        return { alreadyVoted: false, vote }
    }
    else {
        //user has already voted but wanted to change his voting
        //1. stop if upvoted and want to upvote again
        if((vote.upVoted && like))
            return { alreadyVoted: true, vote, message: "Hey, you have already up voted this post." }
        //2. stop if downvoted and want to downvote again
        if((vote.downVoted && !like))
            return { alreadyVoted: true, vote, message: "Hey, you have already down vote this post." }
        vote.vote = tempVote
        vote.upVoted = vote.downVoted = like
        vote.save()
        return { alreadyVoted: false, vote }
    }
}

VoteSchema.methods.unVote = async function () {
    var vote = this
    vote.upVoted = vote.downVoted = false
    vote.vote = 0
    vote.save()
    return vote
}

const Vote = mongoose.model('Vote', VoteSchema)

module.exports = Vote