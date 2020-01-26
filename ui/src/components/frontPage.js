import React, { Component } from 'react';

import CardFlex from './cardflex.js';
import Title from './Title.js';
import '../css/frontPage.css';

export default class FrontPage extends Component {

    render() {
        return (
            <div className="frontContainer">
                <div className="titleBanner">
                    <Title/>
                </div>
                <div className="cardf">
                    <h2 className="listTitle">Session List:</h2>
                    <CardFlex/>
                </div>
            </div>
        )
    }
}