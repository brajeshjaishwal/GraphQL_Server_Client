const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLSchema,
} = require('graphql')

const { User, Post, Comment } = require('../db')

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString }
    }
})
const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        commentedBy: { 
            type: UserType,
            resolve: (_, {}, context, info) => {
                return User.findById(_.commentedBy)
            }
        }
    }
})

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: { type: GraphQLString},
        likes: { type: GraphQLInt},
        author: { 
            type: UserType,
            resolve: async function (_, {}, context, info) {
                return User.findById(_.author)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: async function (_, {}, context, info) {
                return Comment.find({_id: _.comments})
            }
        },
        likedBy: {
            type: new GraphQLList(UserType),
            resolve: async function (_, {}, context, info) {
                return User.find({_id: _.voters})
            }
        }
    }
})

const TokenType = new GraphQLObjectType({
    name: "Token",
    fields: {
        token: { type: GraphQLString }
    }
})

module.exports = { UserType, PostType, CommentType, TokenType } 

