import React from 'react';
import VideoRecorder from './VideoRecorder';

var camIcon = require('../assets/camera.png')

export default class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isVideo: false
        }
    }

    startVideo() {
        if(this.state.isVideo){
            this.setState({ isVideo: false })
        } else {
            this.setState({ isVideo: true })
        }
    }

    getVideo(){
        return this.state.isVideo ? <VideoRecorder/> : null;
    }

    render() {
        return (
            <div className="q-cn">
                <div className="question">
                    <div className="q-text">
                        <h1 className="q-num">{this.props.data.title}</h1>
                        <h1 className="q-ques">{this.props.data.question}</h1>
                    </div>
                    <img onClick={() => this.startVideo()} className="cam-icon" src={camIcon}/>
                </div>
                <div className="q-vid">{this.getVideo()}</div>
            </div>
        )
    }
}