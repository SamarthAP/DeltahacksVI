import React from 'react';
import Card from './card';
import '../css/card.css';

var appData = require('../appData.json').data

export default class CardFlex extends React.Component {
    constructor(props){
        super(props);
    }

    handleData() {
        return appData.map(card => 
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