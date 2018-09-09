import React from 'react'
import { Grid, Image, Header, Form, Label, Text, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import loginMutation from '../GQL/mutation'

export default class Login extends React.Component {

    state = {
        email:"",
        password:"",
        confirmPassword:""
    }

    handleChange = async (event) => {
        var { name, value } = event.target
        await this.setState({[name]: value})
    }

    handleSubmit = async ({event, login}) => {
        event.preventDefault()
        await login({variables: {email: this.state.email, password: this.state.password }})
    }

    render() {
        const {email, password, confirmPassword } = this.state
        return (
            <Mutation mutation={loginMutation} variables={{email, password}}> {
                (Login, {loading, error, data}) => {
                    return (
                        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' /> Log-in to your account
                            </Header>
                            <Form onSubmit={(event => this.handleSubmit({event, Login}))}>
                                <Form.Input icon='email' value={email} label="Email Address" name="email" placeHolder="Email Address" onChange={this.handleChange} />
                                <Form.Input icon='lock' value={password} label="Password" name="Password" placeHolder="Password" onChange={this.handleChange} />
                                <Form.Input icon='lock' value={confirmPassword} label="Confirm Password" name="confirmPassword" placeHolder="Confirm Password" onChange={this.handleChange} />
                                <Form.Checkbox  label='I agree to the Terms and Conditions' />
                                <Form.Button content='Submit' />
                            </Form>
                        </Grid.Column>
                        </Grid>
                    )
                }
            }
            
            </Mutation>
        )
    }
}