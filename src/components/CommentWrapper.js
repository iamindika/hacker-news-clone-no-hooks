import React from 'react';
import Loading from './Loading';
import Post from './Post';
import CommentList from './CommentList';
import {ThemeContext} from '../contexts/theme';
import {getPostDetails} from '../utils/api';
import queryString from 'query-string';

const style = {
  paddingTop: '2rem',
  minHeight: '100vh'
}

export default class CommentWrapper extends React.Component {
  state = {
    post: null,
    error: null
  }

  componentDidMount() {
    const {id} = queryString.parse(this.props.location.search);

    getPostDetails(id)
      .then(post => this.setState({post}))
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {post, error} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
            {!post && <Loading text="Fetching Post"/>}

            {error && <p className='error'>ERROR: {error}</p>}

            {post && (
              <div
                className="container"
                style={style}
              >
                <Post 
                  post={post}
                  size={3}  
                />

                {post.descendants !== 0  
                  ? <CommentList ids={post.kids.slice(0, 50)}/>
                  : null}
              </div> 
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}