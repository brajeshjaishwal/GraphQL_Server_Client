import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppHeader from './components/Header';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
