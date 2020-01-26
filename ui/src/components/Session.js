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
                <Link to="/"><div className="q-back">Back</div></Link>
                <div className="sess">
                    {this.handleData()}
                </div>
            </div>
            
        )
    }
}

