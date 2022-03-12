import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  render() {
    const {user} = this.state;

    return (
      <React.Fragment>
        <Nav/>

        {!user && <Loading text="Fetching User"/>}
      </React.Fragment>
    )
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired
};

User.defaultProps = {
  id: 'dynm'
};