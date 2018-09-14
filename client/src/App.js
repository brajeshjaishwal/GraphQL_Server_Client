import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import Login from './components/login'
import Logout from './components/Logout'
import Welcome from './components/Welcome'
import PostHome from './components/PostHome'
import AppHeader from './components/Header'
import Register from './components/register'
import Profile from './components/Profile';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={new ApolloClient({
                                                  uri: "http://localhost:3300/gql",
                                                  fetchOptions: {
                                                    headers: {
                                                      "x-foobar": "12345678"
                                                    }
                                                }
                                                })}>
          <BrowserRouter>
            <Container >              
              <AppHeader />
              <Container style={{marginTop: '5em', backColor:'grey'}}>
                <Switch>
                  <Route exact path="/" component = { Welcome } />
                  <Route path="/Login" component={Login} />
                  <Route path="/Register" component={Register} />
                  <Route path="/Profile" component={Profile} />
                  <Route path="/Logout" component={Logout} />
                  <Route path="/Concepts" component={PostHome} />
                </Switch>
              </Container>
            </Container>
          </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
