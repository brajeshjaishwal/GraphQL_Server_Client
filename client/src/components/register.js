import React from 'react'
import { NavLink } from 'react-router-dom'
import { Grid, Header, Form, Icon, Segment, Button, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import signUpMutation from '../GQL/mutation'

export default class Register extends React.Component {

    state = {
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    }

    handleChange = async (event) => {
        var { name, value } = event.target
        await this.setState({[name]: value})
    }

    handleSubmit = async ({event, Register}) => {
        event.preventDefault()
        var { name, email, password } = this.state
        console.log(`$ {name}-${email}-${password}`)
        await Register({variables: { name, email, password }})
    }

    render() {
        const {name, email, password, confirmPassword } = this.state
        return (
            <Mutation mutation={signUpMutation} variables={{name, email, password}}>
                {(Register, {loading, error, data}) => {
                return (
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large' onSubmit={(event => this.handleSubmit({event, Register}))}>
                                <Segment >
                                    <Form.Input fluid icon='user' name='name' value={name} iconPosition='left' placeholder='Full Name' onChange={this.handleChange}/>
                                    <Form.Input fluid icon='name' name='email' value={email} iconPosition='left' placeholder='E-mail address' onChange={this.handleChange}/>
                                    <Form.Input fluid icon='lock' name='password' value={password} iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange}/>
                                    <Form.Input fluid icon='lock' name='confirmPassword' value={confirmPassword} iconPosition='left' placeholder='Confirm Password' type='password' onChange={this.handleChange}/>
                                    <Form.Button fluid size='large' content='Submit'>
                                        Register
                                    </Form.Button>
                                </Segment>
                            </Form>
                            <Message>Already a member? <NavLink exact to = '/Login'>Register</NavLink></Message>
                        </Grid.Column>
                    </Grid> )}}
            </Mutation>
        )
    }
}