import React from 'react';

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

    render(){
        return (
            <div className="card">
                <div>
                    SESIION ID
                </div>
                <div className="card-data">
                    <div>
                        <ul>
                            <li>date</li>
                            <li>num quesions</li>
                        </ul>
                    </div>
                    <div>
                        <img src={this.state.data.imgSrc}/>
                    </div>
                </div>
            </div>
        )
    }
}