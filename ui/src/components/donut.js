import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';


export default class EmotionChart extends Component {

    getDataset(){
        return this.props.data
    }

    render() {
        return (
            <div>
                <h2>Deep Analytics</h2>
                <Doughnut data={this.props.data} />
            </div>
        );
    }
}