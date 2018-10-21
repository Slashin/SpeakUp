import React from 'react';
import PropTypes from 'prop-types';

const SpeechInput = ({ onInput, value, onSubmit }) => (
  <div id="apiBox">
    <input id="returnWord" onInput={onInput} value={value}/>
    <button onClick={onSubmit}>Click me? here to call API</button>
    
  </div>
);

SpeechInput.propTypes = {
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

export default SpeechInput;
