import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FrontPage from './components/frontPage';
import SessionPage from './components/sessionPage';


export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={FrontPage}/>
          <Route path='/sessions/:id' component={SessionPage}/>
        </div>
      </Router>
    )
  }
}