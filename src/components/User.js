import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import PostList from './PostList';
import {
  getUser,
  getPostDetails, 
  createUserMarkup} from '../utils/api';
import {getDateString} from '../utils/date';

const style = {
  marginTop: '3rem',
  fontSize: '2.5rem',
  fontWeight: '500',
}

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
      error: null,
      posts: null
    }
  }

  componentDidMount() {
    getUser(this.props.username)
      .then(user => {
        this.setState({user})

        Promise.all(user.submitted.map(postId => getPostDetails(postId)))
          .then(posts => {
            const storyPosts = posts.filter(
              post => !post.deleted && post.type === 'story')

            this.setState({posts: storyPosts});
          })
      })
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {user, error, posts} = this.state;
    
    if(posts) {
      console.log('Posts: ', posts);
    }

    return (
      <React.Fragment>
        <Nav/>

        {!user && !error 
          ? <Loading text="Fetching User"/>
          : null}

        {user && <Profile user={user}/>}
        
        {user && !posts 
          ? <Loading text="Fetching Posts"/>
          : null}
        
        {posts && 
          <React.Fragment>
            <div className="container">
              <h2 style={style}>Posts</h2>
            </div>
            <PostList posts={posts}/>
          </React.Fragment>}

        {error && <p className="error">ERROR: {error}</p>}
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