import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

export default function User({ id }) {
  console.log('PROPS!:', id);
  return (
    <React.Fragment>
      <Nav/>
    </React.Fragment>
  )
}

User.propTypes = {
  id: PropTypes.string.isRequired
};

User.defaultProps = {
  id: 'dynm'
};