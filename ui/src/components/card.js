import React from 'react';
import '../css/card.css';

var nextIcon = require("../assets/play-black.png")

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                imgSrc: nextIcon
            }
        }
    }

    onButton(sessionId){
        //DWIP ROUTE THIS BITCH
    }

    render(){
        return (
            <div className="card">
                <div className="card-title">
                    {this.props.data.id}
                </div>
                <div className="card-data">
                    <div>
                        <ul className="card-list">
                            <li><strong>Complete by: </strong>{this.props.data.date}</li>
                            <li><strong>Number of Questions: </strong>{this.props.data.nQuestions}</li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={() => this.onButton(this.props.data.id)} className="card-btn">
                            <img  className="card-icon" src={this.state.data.imgSrc} />   
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}