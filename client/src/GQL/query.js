import gql from "graphql-tag";

const getAllPostsQuery = gql`
    query {
        Posts {
            id
            title
            content
            likes
            author {
                id
                name
                email
            }
        }
    }
`

export default getAllPostsQuery