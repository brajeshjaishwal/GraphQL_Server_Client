var mongoose = require('mongoose')
const User = require('./models/user')
const Post = require('./models/post')
const Comment = require('./models/comment')

var url = "mongodb://brij:myblogs1@ds239692.mlab.com:39692/brajesh-blogs"

mongoose.Promise = global.Promise
mongoose.connect(url, { useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log(`data base is running on: ${url}`)
}).on('error', args => {
    console.log(args)
    console.log('Some error occurred while connecting database')
})

module.exports = { User, Post, Comment } 