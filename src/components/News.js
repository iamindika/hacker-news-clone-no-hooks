import React from 'react';
import Loading from './Loading';
import PostList from './PostList';
import {getPosts, getPostDetails} from '../utils/api';
import {ThemeContext} from '../contexts/theme';

export default class News extends React.Component {
  state = {
    error: null,
    posts: null
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    const selected = path === '/' ? 'Top' : 'New';

    getPosts(selected)
      .then(data => {
        Promise.all(data.slice(0, 50).map(postId => getPostDetails(postId)))
          .then(posts => this.setState({posts}))
      })
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate(prevProps, prevState) {
    const path = this.props.location.pathname;

    if(prevProps.location.pathname !== path) {
      const selected = path === '/' ? 'Top' : 'New';

      this.setState({error: null});

      getPosts(selected)
        .then(data => {
          Promise.all(data.slice(0, 50).map(postId => getPostDetails(postId)))
            .then(posts => this.setState({posts}))
            .catch(error => this.setState({error: error.message}))
        })
        .catch(error => this.setState({error: error.message}));
    }
  }

  handleClick = (type) => {
    this.setState({selected: type})
  }

  render() {
    const path = this.props.location.pathname;
    const selected = path === '/' ? 'Top' : 'New';
    const {posts, error} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
            {!error && !posts
              ? <Loading text={`Fetching ${selected} Stories`}/>
              : null} 

              {error && <p className='error'>ERROR: {error}</p>}

            {posts && <PostList posts={posts}/>}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}