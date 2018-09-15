const { 
    GraphQLString, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
 } = require('graphql')

const jwt = require('jsonwebtoken')

const { User, Post, Comment } = require('../db')

const { UserType, PostType, CommentType, TokenType } = require('./types')

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        Register: {
            name: "Register",
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async function (_, {name, email, password}, context, info) {
                var user = new User({ name, email, password})
                await user.save()
                context.user = user
                return user
            }
        },
        Login: {
            name: "Login",
            type: TokenType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async function(_, {email, password}, context, info) {
                try{
                    var user = await User.findUser({email, password })
                    if(user)
                    {
                        user.token = await jwt.sign({id: user._id}, 'abcd')
                        context.user = user
                        console.log(context)
                        return { token: user.token }
                    }
                    return { token: ""}
                }catch(error){
                    throw error
                }
            }
        },
        Logout: {
            name: "Logout",
            type: TokenType,
            resolve: async function (_, args, context, info) {
                if(context.user)
                    context.user.token = ""
                return { token: "" }
            }
        },
        CreatePost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                detail: { type: GraphQLString },
            },
            resolve: async function (_, {}, context, info) {
                var post = Post({
                    title,
                    description,
                    detail,
                    author: context.user._id
                })
                post.save()
            }
        },
        LikePost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                like: { type: GraphQLBoolean }
            },
            resolve: async function (_, {id, like}, context, info) {
                try{
                    //first find post
                    var post = await Post.findById(id)
                    //dont allow operation on own post
                    if(post) {
                        if(post.author === context.user._id)
                            throw Error("Hey! you cannot vote yourself.")
                        else {
                            //check whether user have already voted on this
                            var post = await post.doVote(context.user._id, like)                            
                                return post
                        }
                    }
                    throw Error("Hey! post does not exist any more, owner might have deleted it.")
                }catch(error) {
                    throw error
                }
            }
        }
    }
})

module.exports = rootMutation
