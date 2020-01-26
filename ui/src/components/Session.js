import React from 'react';
import Question from './Question';
import '../css/Session.css'

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

    handleData(){
        return data.map(q =>
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

