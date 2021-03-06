import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CardFlex from './components/cardflex';
import Session from './components/Session';
import * as serviceWorker from './serviceWorker';
import Title from './components/Title';
import FrontPage from './components/frontPage';
import SessionPage from './components/sessionPage';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
