const { 
    GraphQLString, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
 } = require('graphql')

const jsonwebtoken = require('jsonwebtoken')

const { User, Post, Comment } = require('../db')

const { UserType, PostType, CommentType, TokenType } = require('./types')

const jwtSecret = '!1`-0-=2346$#$^$#@!'

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
                        user.token = await jsonwebtoken.sign({id: user._id}, jwtSecret)
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
                content: { type: GraphQLString }
            },
            resolve: async function (_, {}, context, info) {
                var post = Post({
                    title,
                    content,
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
                            throw Error("Hey! you are self obsessive.")
                        else {
                            //check whether user have already voted on this
                            var alreadyVoted = await post.userUpvoted(context.user._id)
                            if(alreadyVoted) {
                                throw Error("Hey! you have already voted on this.")
                            }
                            post.likes = post.likes + 1
                            post.likedBy.push(context.user._id)
                            await post.save()
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