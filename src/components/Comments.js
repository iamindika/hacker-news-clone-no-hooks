import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';

export default class Comments extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav/>
        <h1>Comments!!!</h1>
      </React.Fragment>
    )
    }
}