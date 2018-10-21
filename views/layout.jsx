import React from 'react';
import PropTypes from 'prop-types';
import { Header, Jumbotron } from 'watson-react-components';
import $ from 'jquery';


// eslint-disable-mnext-lin =
const DESCRIPTION = 'The IBM Watson Speech to Text service uses speech recognition capabilities to convert Arabic, English, Spanish, French, Brazilian Portuguese, Japanese, and Mandarin speech into text.';




export default function Layout(props) {
  return (
    <html lang="en">
      <head>
        <title>SpeakUp</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/css/watson-react-components.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
      </head>
      <body>

<nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <a className="navbar-brand" href="#"><img src="/images/speak-up-logo.png" width="200" alt=""/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#demoSection">Demo</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#FeaturesSection">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#teamSection">The Team</a>
      </li>
      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}
    </ul>
  </div>
</nav>

<div id="mainSection">

  <div >
    <div className="row" id="mainBox">
      <div className="col-lg-6"><img src="/images/interview-background2.png"/></div>
      <div className="col-lg-6 mainSectionText">
        <h2>Improve Your Confidence Through Eloquent Communication</h2>
        <br/><br/>
        <p className="quote">
          <i>"Whatever words we utter should be chosen with care, for people will hear them and be influenced by them for good or ill"</i>
          <br/>
          <p className="quote">-Buddha</p>
        </p>

      </div>
    </div>
  </div>
  
</div>
        <br/><br/><br/><br/><br/>
        <div id="asdfdsa"></div>

      <div id="demoSection">
        <h1 className="Title">-Demo-</h1>
        <div id="root">
          {props.children}
        </div>

        <button className = "col-lg-1" id="toggleSideButton">Toggle View</button>
        {/* <button className = "col-lg-1" id="viewTranscriptsButton">View Transcripts</button> */}

        <div id="wordEntryBox" className = "row">
          <input placeholder="custom word" className = "col-lg-6" type="text" id="wordEntry" />
          <input className = "col-lg-3" id="colorPicker" name="Color Picker" type="color"/>
          <button className = "col-lg-3" id="customButton">Okay!</button>
        </div>

        <br/>

        <div id="customWordHolder">

        <div style={{ backgroundColor: "Tomato"}} className="customWords">um<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "Orange"}} className="customWords">uh<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "DodgerBlue"}} className="customWords">umm<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "MediumSeaGreen"}} className="customWords">uhh<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "Cyan"}} className="customWords">uhm<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "SlateBlue"}} className="customWords">like<button className="closeButtonStyle">x</button></div>
        <div style={{ backgroundColor: "Violet"}} className="customWords">basically<button className="closeButtonStyle">x</button></div>

        </div>

        <br/><br/>

        <script type="text/javascript" src="scripts/jquery-3.3.1.min.js" />
        <script type="text/javascript" src="scripts/bundle.js" />
        <script type="text/javascript" src="scripts/custom2.js" />
        <script type="text/javascript" src="scripts/bootstrap.js" />
        

        { props.bluemixAnalytics ? <script type="text/javascript" src="scripts/analytics.js" /> : null }

        <div id="topBottomBox">
          <div id="transcriptionBox"></div>
          <br/><br/>
          <h3 className="subTitle">Potential Synonyms</h3>
          <div id="thesaurusBox"></div>
        </div>

        <div className="row" id="sideViewBox">
          <h3 className="subTitle col-lg-6">Transcript</h3>
          <h3 className="subTitle col-lg-6">Potential Synonyms</h3>
          <div id="transcriptionBoxSide" className="col-lg-6"></div>
          <div id="thesaurusBoxSide" className="col-lg-6"></div>
        </div>
          
        <br/>
        
        <div>
          <h3 className="subTitle col-lg-6" style={{margin: "0 auto"}}>Emotion/Sentiment Analysis</h3>
          <div id="sentimentBox" className="col-lg-12"></div>
          <div id = "sentimentBox1"></div>
        </div>
  <br/>
        {/* <div>
          <h3 className="subTitle col-lg-6" style={{margin: "0 auto"}}>Transcript History</h3>
          <div id="transcriptHistoryBox" className="col-lg-12"></div>
        </div> */}
        
     
      </div>

        <br/><br/><br/>

        <div id="footerSection">
          <h1>&copy; SpeakUp 2018</h1>
        </div>

      </body>
    </html>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line
  bluemixAnalytics: PropTypes.bool.isRequired,
};




