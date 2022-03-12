import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import {getUser} from '../utils/api';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      error: null
    }
  }

  componentDidMount() {
    getUser(this.props.username)
      .then(user => this.setState({user}))
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {user, error} = this.state;

    return (
      <React.Fragment>
        <Nav/>

        {!user && !error 
          ? <Loading text="Fetching User"/>
          : null}

        {error && <p className="error">ERROR: {error}</p>}

        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

User.defaultProps = {
  username: 'dynm'
};