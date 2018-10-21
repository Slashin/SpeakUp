/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const {
  Stitch, 
  AnonymousCredential,
  RemoteMongoClient
} = require('mongodb-stitch-server-sdk');

const express = require('express');

const app = express();
const watson = require('watson-developer-cloud');
const thesaurus = require('thesaurus');

// Bootstrap application settings
require('./config/express')(app);

const stt = new watson.SpeechToTextV1({
  // if left undefined, username and password to fall back to the SPEECH_TO_TEXT_USERNAME and
  // SPEECH_TO_TEXT_PASSWORD environment properties, and then to VCAP_SERVICES (on Bluemix)
  // username: '',
  // password: ''
});

const authService = new watson.AuthorizationV1(stt.getCredentials());

app.get('/', (req, res) => {
  res.render('index', {
    bluemixAnalytics: !!process.env.BLUEMIX_ANALYTICS,
    
  });

});

app.get('/api/thesaurus', (req, res) => {
  res.send({ response: thesaurus.find(req.query.word).slice(0,10) });

});

// Get token using your credentials
app.get('/api/token', (req, res, next) => {
  authService.getToken((err, token) => {
    if (err) {
      next(err);
    } else {
      res.send(token);
    }
  });
});



const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

app.get('/api/sentiment', (req, res) => {
  // The text to analyze
  // Imports the Google Cloud client library

const text = req.query.divContent;

const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Sentiment and Emotion Detector

client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    res.send({
      "text": `Text: ${text}`,
      "Score": `Sentiment score: ${sentiment.score}`,
      "Magnitude": `Sentiment magnitude: ${sentiment.magnitude}`

    });

  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});


//MongoDB Stitch 

const stitch_client = Stitch.initializeDefaultAppClient('interprep_db-jbois');

const db = stitch_client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('InterPrepDB');

app.get('/api/transcripts', (req, res) => {

stitch_client.auth.loginWithCredential(new AnonymousCredential()).then(user => 
db.collection('Transcripts').insertOne({owner_id: stitch_client.auth.user.id,number:req.query.divContent})
).then(() => 
db.collection('Transcripts').find({owner_id: stitch_client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
  res.send(docs);
}).catch(err => {
  console.error(err)
});

});







module.exports = app;
