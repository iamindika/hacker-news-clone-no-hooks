import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import PostList from './PostList';
import {ThemeContext} from '../contexts/theme';
import {
  getUser,
  getPostDetails, 
  createMarkup} from '../utils/api';
import {getDateString} from '../utils/date';

const style = {
  marginTop: '3rem',
  fontSize: '2.5rem',
  fontWeight: '500',
}

function Profile({user}) {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <div className={`user container bg-${theme}`}>
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
                  dangerouslySetInnerHTML={createMarkup(user.about)}
                />}
        </div>
      )}
    </ThemeContext.Consumer>
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
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
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

            {error && (
              <div className="error">
                <p className={
                  `error__text error__text--${theme === 'light' ? 'dark' : 'light'}`
                }>ERROR: {error}</p>
              </div>
            )}
          </div>
        )}

      </ThemeContext.Consumer>
    )
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

User.defaultProps = {
  username: 'Topolomancer'
};