import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Container, Header, Icon} from 'semantic-ui-react'
import Login from './components/login';
import Register from './components/register';
import PostHome from './components/PostHome';
import Welcome from './components/Welcome';
import Logout from './components/Logout';
import AppHeader from './components/Header';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={new ApolloClient({uri: "http://localhost:3300/gql"})}>
          <BrowserRouter>
            <Container>
              <Header as='h3' color='red'>
                <Icon color='purple' name='users' />
                <Header.Content >Reader & Writer</Header.Content>
              </Header>
              <AppHeader />
              <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/Blogs" component={PostHome}></Route>
                <Route exact path="/Login" component={Login}></Route>
                <Route exact path="/Register" component={Register}></Route>
                <Route exact path="/Logout" component={Logout}></Route>
              </Switch>
            </Container>
          </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
