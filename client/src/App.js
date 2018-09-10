import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Container, Header, Icon, Label} from 'semantic-ui-react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import Login from './components/login'
import Logout from './components/Logout'
import Welcome from './components/Welcome'
import Post from './components/Post'
import PostHome from './components/PostHome'
import AppHeader from './components/Header'
import Register from './components/register'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={new ApolloClient({uri: "http://localhost:3300/gql"})}>
          <BrowserRouter>
            <Container >
              <Header as='h3' color='red' style={{ marginTop: '1em'} }>
                <Icon color='purple' name='users' />
                <Header.Content>
                  <Label color='orange'>
                    <b>Concept</b>
                    <Label.Detail>Share</Label.Detail>
                  </Label>
                </Header.Content>
              </Header>
              <AppHeader />
              <Switch>
                <Route exact path="/" component = { Welcome } />
                <Route exact path="/Concepts" component= { PostHome } />
                <Route exact path="/Login" component={Login}></Route>
                <Route exact path="/Register" component={Register}></Route>
                <Route exact path="/Logout" component={Logout} />
              </Switch>
            </Container>
          </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
