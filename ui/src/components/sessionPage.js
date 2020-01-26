import React, { Component } from 'react';

import Session from './Session';
import Title from './Title';
import '../css/Title.css';
import '../css/sessionPage.css';

export default class SessionPage extends Component {

    render() {
        return (
            <div className="frontContainer">
                <div className="titleBanner">
                    <Title/>
                </div>
                <div className="sessionStyle">
                    <Session/>
                </div>
            </div>
        )
    }
}