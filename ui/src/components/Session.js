import React from 'react';
import Question from './Question';
import '../css/Session.css'

var appData = require('../appData.json').data;

export default class Session extends React.Component {

    /**
     * 
     * session title
     * list of questions 
     * 
     */
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
            <div className="sess">
                {this.handleData()}
            </div>
        )
    }
}

