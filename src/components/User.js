import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import {getUser, createUserMarkup} from '../utils/api';
import {getDateString} from '../utils/date';

function Profile({user}) {
  return (
    <div className="user container">
      <h1 className="user__id">{user.id}</h1>
      <p className="desc">
        joined&nbsp; 
        <span className="desc--bold">{getDateString(user.created)}</span> 
        &nbsp;has&nbsp;
        <span className="desc--bold">{new Number(user.karma).toLocaleString()}</span>
        &nbsp;karma
      </p>
      {user.about 
        && <div
              className="user__misc" 
              dangerouslySetInnerHTML={createUserMarkup(user)}
            />}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
}

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

        {user && <Profile user={user}/>}
      </React.Fragment>
    )
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

User.defaultProps = {
  username: 'leni536'
};