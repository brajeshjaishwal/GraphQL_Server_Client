const { 
        GraphQLString, 
        GraphQLList,
        GraphQLObjectType } = require('graphql')

const { User, Post, Comment } = require('../db')

const { UserType, PostType, CommentType } = require('./types')

const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        Info: {
            type: GraphQLString,
            resolve: () => "Welcome to gql v2"
        },
        CurrentUser: {
            type: UserType,
            resolve: (_, {}, context) => {
                return context.user
            }
        },
        Posts: {
            type: new GraphQLList(PostType),
            resolve: () => Post.find({})
        },
        MyPosts: {
            type: new GraphQLList(PostType),
            args: {
                email: {type: GraphQLString}
            },
            resolve: async function (_, {email}, context, info) {
                try{
                    //first find user
                    var user = await User.findOne({email})
                    if(user) {
                        //now find post for this user
                        var posts = await Post.find({author: user._id})
                        return posts
                    }
                }catch(error){
                    throw error
                }
                return null
            }
        }
    }
})

module.exports = rootQuery