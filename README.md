# DeltahacksVI

## Inspiration

Therapy can be hard, time consuming and embarrassing for some people, and there is a stigma around therapy that stops many people from attending or trying it out. Our application Healix gives patients a platform to discuss their emotions and concerns to their therapist in the comfort of their own home. Having this functionality, therapy can become much more accessible and easier to get into.

## What it does

The patient can access sessions that their therapist posts and record a short response discussing there feelings and whatever else is on their minds. This response is then sent to the therapist who can analyze it for upcoming sessions and future reference. After recording the response, the user is also given a graph which outlines the different emotions that they experienced throughout video.

## How we built it

The front end was built using React.js. The back end was built using Flask. We used keras and opencv for the emotion detection, and the firebase real-time database for data.

## Challenges we ran into

We ran into many challenges connecting the different aspects of our application. We needed to synchronize our data (sessions and questions) and the computed user data with the front end to produce a user friendly interface. Another difficult aspect was with the video encoding and processing, as well as producing the algorithms to detect facial expressions and parse them as usable data objects for the front end.

## What we learned

We learned a lot about handling video data (encoding, decoding, blobs). 

## What's next for Healix

Moving forward, there are several aspects of Healix which need to be built upon to turn it into a full functioning platform. We would like to harness the power of machine learning to produce different metrics and analytics so that therapists have more insight about the course of action that needs to be taken. Simple features such as the ability to re-watch a video before submission or the ability to retake a video would potentially be useful as well. Lastly, we would also like to optimize the data intake and processing to produce faster results.
