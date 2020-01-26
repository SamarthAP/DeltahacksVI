import React from 'react';
import '../css/card.css';
import {Link} from 'react-router-dom';

var nextIcon = require("../assets/play-black.png")

export default class Card extends React.Component {
    constructor(props){
        super(props);
    }

    getPath(){
        return "/sessions/" + this.props.data.sessionId
    }

    render(){
        return (
            <div id="ii" className="card">
                <div className="card-title">
                    Session {this.props.data.sessionId}
                </div>
                <div className="card-data">
                    <div>
                        <ul className="card-list">
                            <li><strong>Complete by: </strong>{this.props.data.date}</li>
                            <li><strong>Number of Questions: </strong>{this.props.data.nQuestions}</li>
                            <li><strong>Estimated Completion Time: </strong>{this.props.data.time}</li>
                        </ul>
                    </div>
                    <div>
                        <Link to={this.getPath()}> <img className="card-icon" src={nextIcon} /></Link>
                    </div>
                </div>
            </div>
        )
    }
}