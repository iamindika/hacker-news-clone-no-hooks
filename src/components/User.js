import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import PostList from './PostList';
import {ThemeContext} from '../contexts/theme';
import {
  getUser,
  getPostDetails, 
  createMarkup} from '../utils/api';
import {getDateString} from '../utils/date';
import queryString from 'query-string';

const style = {
  container: {
    minHeight: '100vh'
  },
  content: {
    marginTop: '3rem',
    fontSize: '2.5rem',
    fontWeight: '500',
  }
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
  state = {
    user: null,
    error: null,
    posts: null
  }

  componentDidMount() {
    const {id} = queryString.parse(this.props.location.search);

    getUser(id)
      .then(user => {
        this.setState({user})

        Promise.all(user.submitted.slice(0, 50).map(postId => getPostDetails(postId)))
          .then(posts => {
            const storyPosts = posts.filter(
                post => !post.dead && !post.deleted && post.type === 'story');

            this.setState({posts: storyPosts});
          })
      })
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {user, error, posts} = this.state;
    
    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`} style={style.container}>
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
                  <h2 style={style.content}>Posts</h2>
                </div>
                <PostList posts={posts}/>
              </React.Fragment>}

              {error && <p className='error'>ERROR: {error}</p>}
          </div>
        )}

      </ThemeContext.Consumer>
    )
  }
}