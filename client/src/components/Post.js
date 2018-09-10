import React from 'react'
import { Rating, Card, Icon, Grid, Segment, Image } from 'semantic-ui-react'

const PostComponent = ({post}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Content header>                    
                    <Grid>
                        <Grid.Row columns='equal'>
                            <Grid.Column >
                                {post.title}
                            </Grid.Column>
                            <Grid.Column floated='right' width={1}>
                                <Icon name="pencil alternate" />
                            </Grid.Column>
                            <Grid.Column floated='right' width={2}>
                                <Icon name="trash alternate outline" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Meta>{post.author.name}</Card.Meta>
                <Card.Description>{post.content}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column >
                            <div>likes: {post.likes}</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Rating rating={1} maxRating={5} />
                        </Grid.Column>
                        <Grid.Column floated='right' width={1}>
                            <Icon name="thumbs up" color='purple' />
                        </Grid.Column>
                        <Grid.Column floated='right' width={2}>
                            <Icon name="thumbs down" color='red'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    )
}

export default PostComponent