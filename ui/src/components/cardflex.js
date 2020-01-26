import React from 'react';
import Card from './card';
import '../css/card.css';

var cardData = [
    {
        sessionId: 1,
        date: "Jan 31, 2020",
        nQuestions: "10",
        time: "10min"
        
    },{
        sessionId: 2,
        date: "Feb 1, 2020",
        nQuestions: "2",
        time: "15min"

    },{
        sessionId: 3,
        date: "Jan 31, 2020",
        nQuestions: "10",
        time: "10min"

    },{
        sessionId: 4,
        date: "Jan 31, 2020",
        nQuestions: "10",
        time: "10min"
    }
    
]

export default class CardFlex extends React.Component {
    constructor(props){
        super(props);
    }

    handleData() {
        return cardData.map(card => 
            <Card data={card}/>
        );
    }

    render() {
        return (
            <div className="card-cnt">
                {this.handleData()}
            </div>
        )
    }
}