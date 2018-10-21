import React, { Component } from 'react';

// import logo from './logo.svg';

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: ''};
  }

 

  componentDidMount() {
   return fetch ('/api/thesaurus')
   .then((response)=> response.json())
   .then((responseJson)=>{
    this.setState({
      message: responseJson.message
    });
   })
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.message}</p>
      </div>
    );
  }
}

export default App;


// export default React.createClass({
//   displayName: 'Thesaurus',

//   getInitialState() {
//     return {
//       message: ""
//     };
//   },

//   componentDidMount() {
//     this.fetchsaurus();
//     // tokens expire after 60 minutes, so automatcally fetch a new one ever 50 minutes
//     // Not sure if this will work properly if a computer goes to sleep for > 50 minutes
//     // and then wakes back up
//     // react automatically binds the call to this
//     // eslint-disable-next-line
//     this.setState({ message: this.fetchsaurus });
//   },

//   fetchsaurus() {
//     return fetch('/api/thesaurus').then((res) => {
//       if (res.status !== 200) {
//         throw new Error('Error retrieving auth token');
//       }
//       return res.text();
//     }) // todo: throw here if non-200 status
//       .then(token => this.setState({ token })).catch(this.handleError);
//   },

//   //  componentDidMount() {
//   //  return fetch ('/api/thesaurus')
//   //  .then((response)=> response.json())
//   //  .then((responseJson)=>{
//   //   this.setState({
//   //     message: responseJson.message
//   //   });
//   //   console.log("hi");
//   //  })
//   // },

//   render() {
//     return (
//       <div className="App">
//         <p className="App-intro">{this.state.message}</p>
//         <p>asdfsdadfas</p>
//       </div>
//     );
//   }

// });





