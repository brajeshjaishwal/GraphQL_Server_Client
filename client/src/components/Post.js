import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Icon, Grid } from 'semantic-ui-react'

const PostComponent = ({post}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header><NavLink exact to='/'>{post.title}</NavLink></Card.Header>
                <Card.Meta>
                    <Icon name='user'/>
                    {post.author.name}
                </Card.Meta>
                <Card.Description>{post.content}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column >
                            <div>likes: {post.likes}</div>
                        </Grid.Column>
                        <Grid.Column floated='right' width={2}>
                            <Icon name="thumbs up" color='purple' />
                            <Icon name="thumbs down" color='red'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    )
}

export default PostComponent