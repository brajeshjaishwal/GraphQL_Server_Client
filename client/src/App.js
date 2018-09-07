import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Blogger.</h1>
        </header>
        <Route>
          <Switch>
            <Route />
          </Switch>
        </Route>
      </div>
    );
  }
}

export default App;
