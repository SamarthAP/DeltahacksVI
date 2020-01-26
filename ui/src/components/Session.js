import React from 'react';
import Question from './Question';
import { Link } from 'react-router-dom';
import '../css/Session.css'

var appData = require('../appData.json').data;

export default class Session extends React.Component {

    constructor(props) {
        super(props);
    }

    getSession(){
        var queryString = window.location.href;
        return queryString.slice(-1);
    }

    getData(){
        
        var queryString = this.getSession();

        var questions;

        appData.forEach(d => {
            if(d.sessionId == queryString){
                questions = d.questions
            }
        })

        return questions
    }

    handleData(){
                
        return this.getData().map(q =>
            <Question data={q} session={this.getSession()}/>
        );
    }

    render() {
        return (
            <div>
                <Link to="/">
                <div className="q-back">
                <svg width="48" height="48" viewBox="0 0 24 24">
                    <path d="M20 11H6.83l2.88-2.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L3.71 11.3c-.39.39-.39 1.02 0 1.41L8.3 17.3c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L6.83 13H20c.55 0 1-.45 1-1s-.45-1-1-1z" fill="rgb(255, 250, 221)"/>
                </svg>
                </div>
                </Link>
                <div className="sess">
                    {this.handleData()}
                </div>
            </div>
            
        )
    }
}

