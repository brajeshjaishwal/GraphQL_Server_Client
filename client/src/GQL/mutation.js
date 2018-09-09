import gql from 'graphql-tag'

const signUpMutation = gql `
mutation($name:String!, $email:String!, $password: String!) {
    Register(name: $name, email: $email, password: $password) {
        id
        name
        email
    }
}
`

const loginMutation = gql `
mutation($email: String!, $password: String!) {
    Login(email:$email, password:$password) {
        token
    }
}
`

export default loginMutation