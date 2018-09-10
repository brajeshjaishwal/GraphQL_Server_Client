import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import getAllPostsQuery from '../GQL/query';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import PostComponent from './Post';

export default class PostHome extends React.Component {
    render() {
        return (
            <Query query={ getAllPostsQuery }> 
                {({loading, error, data, networkStatus }) => {
                        if(loading) return <Loader active inline='centered' />
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