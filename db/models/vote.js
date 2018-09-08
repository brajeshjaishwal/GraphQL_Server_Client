const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteSchema = new Schema({
    postId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    vote: Number,
    rating: Number, //star rating
    voteType: {
        type: String,
        enum : [ 'up', 'down', '-' ],
        default: '-'
    }
})

VoteSchema.statics.doVote = async function ({userId, postId, like}) {
    var tempVote = like ? 1 : -1;
    var voteType = like ? 'up' : 'down'
    var Users = mongoose.model('User')
    var user = await Users.findById(userId)
    var vote = await Votes.findOne({ postId, userId })

    if(vote === null || vote === undefined || vote.length === 0) {
        //no voting done on this post by this user
        vote = Votes({
            postId,
            userId,
            vote: tempVote,
            voteType,
        })
        vote.save()
        return { alreadyVoted: false, vote }
    }
    else {
        //vote = await Votes.findById(vote._id)
        //user has already voted but wanted to change his voting
        //1. stop if upvoted and want to upvote again
        if((vote.voteType === 'up' && like))
            return { alreadyVoted: true, vote, message: "Hey, you have already up voted this post." }
        //2. stop if downvoted and want to downvote again
        if((vote.voteType === 'down' && !like))
            return { alreadyVoted: true, vote, message: "Hey, you have already down vote this post." }
        vote.vote = tempVote
        vote.voteType = voteType
        vote.save()
        return { alreadyVoted: true, vote }
    }
}

VoteSchema.methods.unVote = async function () {
    var vote = this
    vote.voteType = '-'
    vote.vote = 0
    vote.save()
    return vote
}

const Votes = mongoose.model('Vote', VoteSchema)

module.exports = Votes