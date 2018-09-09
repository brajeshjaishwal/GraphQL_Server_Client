import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import getAllPostsQuery from '../GQL/query';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import PostComponent from './Post';

const PostHome1 = () => (
    <Query query = { getAllPostsQuery } >
        {({ loading, error, data, networkStatus }) => {
            if (loading) return <div>Loading ...</div>
            if (error) return <div>`Error!: ${error} ${networkStatus}`</div>
            return <div>`data!: ${data.Posts}`</div>
            }}
        </Query>
    )
//export default PostHome1

class PostHome extends React.Component {
    render() {
        return (
            <Query query={ getAllPostsQuery }> 
                {({loading, error, data, networkStatus }) => {
                        if(loading) return <div>Loading</div>
                        if(error) return <div>`Error!: ${error} ${networkStatus}`</div>
                        console.log(data)
                        return (
                            data.Posts.map(p => (
                            <ul>
                                <PostComponent post= {p} />
                            </ul>))
                        )
                    }
                }
            </Query>
        )
    }
}

export default PostHome