import gql from 'graphql'

const allposts = gql `
    query {
        Posts {
            id
            title
            content
            author {
            id
            name
            email
            }
    }
}
`