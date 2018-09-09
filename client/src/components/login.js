import React from 'react'
import { Grid, Header, Form, Icon, Segment, Button, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import loginMutation from '../GQL/mutation'

export default class Login extends React.Component {

    state = {
        email:"",
        password:"",
    }

    handleChange = async (event) => {
        var { name, value } = event.target
        await this.setState({[name]: value})
    }

    handleSubmit = async ({event, Login}) => {
        event.preventDefault()
        var { email, password } = this.state
        await Login({variables: {email, password }})
    }

    render() {
        const {email, password, confirmPassword } = this.state
        return (
            <Mutation mutation={loginMutation} variables={{email, password}}>
                {(Login, {loading, error, data}) => {
                return (
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large' onSubmit={(event => this.handleSubmit({event, Login}))}>
                                <Segment stacked>
                                    <Form.Input fluid icon='envelope' name='email' value={email} iconPosition='left' placeholder='E-mail address' onChange={this.handleChange}/>
                                    <Form.Input fluid icon='lock' name='password' value={password} iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange}/>
                                    <Form.Button color='purple' fluid size='large' content='Submit'>
                                        Login
                                    </Form.Button>
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <a href='/Register'>Register</a>
                            </Message>
                        </Grid.Column>
                    </Grid> )}}
            </Mutation>
        )
    }
}