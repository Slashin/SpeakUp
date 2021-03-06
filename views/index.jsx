import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Demo from './demo';
import ReactDOM from 'react-dom';
import ThesaurusApp from './thesaurusApp';

export default function Index(props) {
  return (<Layout bluemixAnalytics={props.bluemixAnalytics} ><Demo /></Layout>);
}


Index.defaultProps = {
  bluemixAnalytics: false,
};

Index.propTypes = {
  bluemixAnalytics: PropTypes.bool,
};
