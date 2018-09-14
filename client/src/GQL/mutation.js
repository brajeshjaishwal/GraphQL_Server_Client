import gql from 'graphql-tag'

export const signUpMutation = gql `
    mutation($name:String!, $email:String!, $password: String!) {
        Register(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const loginMutation = gql `
    mutation($email: String!, $password: String!) {
        Login(email:$email, password:$password) {
            token
        }
    }
`

export const likePostMutation = gql `
    mutation($id:ID!) {
        LikePost(id:$id, like:true) {
            title
            likes
            likedBy {
                name
            }
        }
    }
`