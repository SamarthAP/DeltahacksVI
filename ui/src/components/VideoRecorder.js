import React from 'react';
import '../css/VideoRecorder.css';

const videoType = 'video/webm';

class VideoRecorder extends React.Component {

    /**
     * 
     * title
     */
    constructor(props) {
        super(props)

        this.state = {
            recording: false,
        }
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

        // show to user
        this.video.srcObject = stream
        this.video.play()

        // init recording 
        this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: videoType
        })

        // init data storage for video chunks 
        this.chunks = []

        // listen for data from media recorder 
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data)
            }
        }
    }

    startRecording(e) {
        e.preventDefault()

        this.chunks = [] // clear old chunks 

        this.mediaRecorder.start(10)

        this.setState({ recording: true })
    }

    stopRecording(e) {
        e.preventDefault()

        this.mediaRecorder.stop()

        this.setState({ recording: false })

        this.saveVideo()
    }

    saveVideo() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, { type: videoType });
        // console.log(blob)

        this.blobToBase64(blob, function(base64) {
            const update = { 'blob': base64 }

            fetch('https://127.0.0.1/video', {
                method: 'POST',
                body: update
            })
        })

    }

    blobToBase64(blob, callback) {
        const reader = new FileReader()

        reader.onload = function() {
            const dataUrl = reader.result
            const base64 = dataUrl.split(',')[1]
            callback(base64)
        }

        reader.readAsDataURL(blob)
    }

    render() {
        const {recording} = this.state;

        return (
            <div className="VideoRecorder">
                <video
                    style={{width: 400}}
                    ref={v => {
                        this.video = v
                    }}
                >
                    Video stream not available
                </video>
                <div>
                    {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
                    {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
                </div>
            </div>
        )
    }
}

export default VideoRecorder;
