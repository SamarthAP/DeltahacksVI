from flask import Flask, escape, request
from flask_cors import CORS
import json

from firebase import firebase

import numpy as np
import keras
from keras.models import load_model
from keras.preprocessing.image import img_to_array
import cv2

import base64

firebase = firebase.FirebaseApplication('https://delta6-696c6.firebaseio.com/', None)

app = Flask(__name__)
CORS(app)

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# cap = cv2.VideoCapture('./test.webm')
model = load_model('model_v6_23.hdf5')

labels = {
    0: 'Angry', 
    1: 'Disgust', 
    2: 'Fear', 
    3: 'Happy', 
    4: 'Neutral', 
    5: 'Sad', 
    6: 'Surprise'
    }

def detect_face(frame):
    gray = cv2.cvtColor(frame.copy(), cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(frame, 1.3, 5)

    if faces is ():
        return (0, 0, 0, 0), np.zeros((48, 48), np.uint8), frame

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        region_wanted = gray[y:y + h, x:x + w] # gray 
    try:
        region_wanted = cv2.resize(region_wanted, (48, 48), interpolation = cv2.INTER_AREA)
    except:
        return (x,w,y,h), np.zeros((48,48), np.uint8), frame
    return (x,w,y,h), region_wanted, frame

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'

@app.route('/video', methods=['POST'])
def analyze_video():
    decoded = base64.b64decode(request.json['blob'])
    fileName = str(request.json['session']) + '-' + str(request.json['question']) + '.webm'

    with open(fileName, 'wb') as file:
        file.write(decoded)
    
    cap = cv2.VideoCapture(fileName)
    arr = []
    while True:
        
        ret, img_frame = cap.read()

        if (img_frame is None):
            break

        rect, face, frame = detect_face(img_frame)

        if np.sum([face]) != 0.0:
            roi = face.astype("float") / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)

            predictions = model.predict(roi)[0]

            arr.append(predictions.argmax()) # ------------
        else:
            arr.append(-1) # ------------

    cap.release()

    print(arr)

    res = firebase.post(
        '/emotions',
        {
            str(request.json['session']) + '-' + str(request.json['question']): [int(i) for i in arr]
        }
    )

    # return json.dumps([int(i) for i in arr])
    return 'thanks'