import React from 'react';
import Question from './Question';
import '../css/Session.css'

var newdata = [
    {   
        sessionId: 1,
        questions: [
            {
                id: 1,
                question: "How wet is ur pu$$y"
            },{
                id: 2,
                question: "how deep is ur love"
            },{
                id: 3,
                question: "dont u want me baby"
            }
        ]
    },{   
        sessionId: 2,
        questions: [
            {
                id: 1,
                question: "how much was ram's perm"
            },{
                id: 2,
                question: "how many goldfish can dwip fit in his mouth"
            }
        ]
    },{   
        sessionId: 3,
        questions: [
            {
                id: 1,
                question: "hello"
            },{
                id: 2,
                question: "its"
            },{
                id: 3,
                question: "me"
            },{
                id: 4,
                question: "baby"
            }
        ]
    },{   
        sessionId: 4,
        questions: [
            {
                id: 1,
                question: "How wet is ur pu$$y"
            },{
                id: 2,
                question: "how deep is ur love"
            },{
                id: 3,
                question: "dont u want me baby"
            }    
        ]
    }
]

var data = [
    {
        title: "Question 1",
        question: "How does heebeejeebees make you feel?"
    },{
        title: "Question 2",
        question: "How does heejeebeejees make you feel?"
    },{
        title: "Question 3",
        question: "How does peepee make you feel?"
    },{
        title: "Question 4",
        question: "How does booboo make you feel?"
    }
]

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

    getData(){
        var queryString = window.location.href;
        queryString = queryString.slice(-1);

        var questions;

        newdata.forEach(d => {
            if(d.sessionId == queryString){
                questions = d.questions
            }
        })

        return questions
    }

    handleData(){
                
        return this.getData().map(q =>
            <Question data={q}/>
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

