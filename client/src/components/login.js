import React from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Form, Segment, Message } from 'semantic-ui-react';
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
                                <Segment >
                                    <Form.Input fluid icon='name' name='email' value={email} iconPosition='left' placeholder='E-mail address' onChange={this.handleChange}/>
                                    <Form.Input fluid icon='lock' name='password' value={password} iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange}/>
                                    <Form.Button fluid size='large' content='Submit'>
                                        Login
                                    </Form.Button>
                                </Segment>
                            </Form>
                            <Message>New to us? <NavLink exact to = '/Register'>Register</NavLink></Message>
                        </Grid.Column>
                    </Grid> )}}
            </Mutation>
        )
    }
}