import React from 'react';

import SpeechInput from './speech-input.jsx';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', result: '' };
  }

  componentDidMount() {

    this.interval = setInterval(() => {
      this.callApi();
    }, 1);

  }

  handleInputChanged(event) {
    this.setState({ text: event.target.value });
  }

  callApi() {
    const input = this.refs.thesaurusWordHolder.innerHTML;
    fetch(`/api/thesaurus?word=` + input)
      .then(result => result.json())
      .then((result) => {
        this.setState({
          result,
        });
      })
      .catch(error => console.log('error is', error));
  }

  render() {
    return (
      <div>
        <SpeechInput
  
          value={this.state.result.response}
          onSubmit={e => this.callApi(e)}
         
        />
        <div id="thesaurusOutput">{JSON.stringify(this.state.result.response)}</div>
        <div ref="thesaurusWordHolder" id="thesaurusWordHolder"></div>
      </div>
    );
  }
}

export default Application;
