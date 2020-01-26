import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import '../css/VideoRecorder.css';
import firebase from 'firebase';

const videoType = 'video/webm';

//const ds = [0,2,1,3,4,3,5,6,0,0,3,3,3,3,4,2,1,2]

class VideoRecorder extends React.Component {

    /**
     * 
     * title/ session number
     * question number
     */
    constructor(props) {
        super(props)

        this.state = {
            recording: false,
            dataset: {
                labels: [
                    'Angry',
                    'Disgust',
                    'Fear',
                    'Happy',
                    'Neutral',
                    'Sad',
                    'Surprise'
                ],
                datasets: [{
                    data: [1, 1, 1, 1, 1, 1, 1],
                    backgroundColor: [
                        '#DC0A73',
                        '#F1CAC5',
                        '#5E4866',
                        '#C88CEF',
                        '#B0B5E8',
                        '#AE9EB3',
                        '#F57359'
                    ]
                }]
            }
        }

        this.saveVideo = this.saveVideo.bind(this)
        this.blobToBase64 = this.blobToBase64.bind(this)
        this.formatDataset = this.formatDataset.bind(this)

        //console.log(firebase.apps[0].firebase_.Reference)
        this.emotions = firebase.apps[0].firebase_.database().ref().child('/emotions');


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

        this.emotions.on('value', res => {
            for (var key in res.val()) {
                for(var key2 in res.val()[key]){
                    console.log(key2)
                    if (key2 == this.props.session + "-" + this.props.question) {
                            let numAngry = res.val()[key][key2].filter(x => x == 0).length;
                            let numDisgust = res.val()[key][key2].filter(x => x == 1).length;
                            let numFear = res.val()[key][key2].filter(x => x == 2).length;
                            let numHappy = res.val()[key][key2].filter(x => x == 3).length;
                            let numNeutral = res.val()[key][key2].filter(x => x == 4).length;
                            let numSad = res.val()[key][key2].filter(x => x == 5).length;
                            let numSurprise = res.val()[key][key2].filter(x => x == 6).length;
                            
                            console.log("dfsdfadsfds")
                            console.log(numAngry)
                            this.setState({ 
                                dataset: {
                                    labels: [
                                        'Angry',
                                        'Disgust',
                                        'Fear',
                                        'Happy',
                                        'Neutral',
                                        'Sad',
                                        'Surprise'
                                    ],
                                    datasets: [{
                                        data: [numAngry, numDisgust, numFear, numHappy, numNeutral, numSad, numSurprise],
                                        backgroundColor: [
                                            '#DC0A73',
                                            '#F1CAC5',
                                            '#5E4866',
                                            '#C88CEF',
                                            '#B0B5E8',
                                            '#AE9EB3',
                                            '#F57359'
                                        ]
                                    }]
                                } 
                            })  
                            const a = res.val()
                            console.log(typeof(res.val()[key][key2]))
                            console.log(a)
                            break
                    }
                }
                //if(res.val()[key][0] == this.props.session + "-" + i.question == this.props.question)
            }
            // for(var i in res.val){
            //     if(this.props.session + "-" + i.question == this.props.question){
            //         let numAngry = i.emotions.filter(x => x == 0).length;
            //         let numDisgust = i.emotions.filter(x => x == 1).length;
            //         let numFear = i.emotions.filter(x => x == 2).length;
            //         let numHappy = i.emotions.filter(x => x == 3).length;
            //         let numNeutral = i.emotions.filter(x => x == 4).length;
            //         let numSad = i.emotions.filter(x => x == 5).length;
            //         let numSurprise = i.emotions.filter(x => x == 6).length;
                    
            //         this.setState({ 
            //             dataset: {
            //                 labels: [
            //                     'Angry',
            //                     'Disgust',
            //                     'Fear',
            //                     'Happy',
            //                     'Neutral',
            //                     'Sad',
            //                     'Surprise'
            //                 ],
            //                 datasets: [{
            //                     data: [numAngry, numDisgust, numFear, numHappy, numNeutral, numSad, numSurprise],
            //                     backgroundColor: [
            //                         '#DC0A73',
            //                         '#F1CAC5',
            //                         '#5E4866',
            //                         '#C88CEF',
            //                         '#B0B5E8',
            //                         '#AE9EB3',
            //                         '#F57359'
            //                     ]
            //                 }]
            //             } 
            //         })        
            //     }
            // }

            
        });
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

        var session = this.props.session
        var question = this.props.question

        this.blobToBase64(blob, function(base64) {
            const update = {
                'session': session,
                'question': question,
                'blob': base64
            }

            // console.log(update)

            fetch('http://127.0.0.1:5000/video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            }).then(data => {
                return data.json()
            }).then(res => this.formatDataset(res))
        })

    }



    formatDataset(res) {
        let numAngry = res.filter(x => x == 0).length;
        let numDisgust = res.filter(x => x == 1).length;
        let numFear = res.filter(x => x == 2).length;
        let numHappy = res.filter(x => x == 3).length;
        let numNeutral = res.filter(x => x == 4).length;
        let numSad = res.filter(x => x == 5).length;
        let numSurprise = res.filter(x => x == 6).length;

        this.setState({ 
            dataset: {
                labels: [
                    'Angry',
                    'Disgust',
                    'Fear',
                    'Happy',
                    'Neutral',
                    'Sad',
                    'Surprise'
                ],
                datasets: [{
                    data: [numAngry, numDisgust, numFear, numHappy, numNeutral, numSad, numSurprise],
                    backgroundColor: [
                        '#DC0A73',
                        '#F1CAC5',
                        '#5E4866',
                        '#C88CEF',
                        '#B0B5E8',
                        '#AE9EB3',
                        '#F57359'
                    ]
                }]
            } 
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
                <div className="donut">
                    {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
                    {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
                </div>
                <Doughnut data={this.state.dataset}/>
            </div>
        )
    }
}

export default VideoRecorder;

