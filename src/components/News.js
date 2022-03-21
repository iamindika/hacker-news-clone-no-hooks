import React from 'react';
import Loading from './Loading';
import PostList from './PostList';
import {getPosts, getPostDetails} from '../utils/api';
import {ThemeContext} from '../contexts/theme';

export default class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    const selected = path === '/' ? 'Top' : 'New';

    getPosts(selected)
      .then(data => {
        Promise.all(data.slice(0, 50).map(postId => getPostDetails(postId)))
          .then(posts => this.setState({[selected]: posts}))
      })
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate(prevProps, prevState) {
    const path = this.props.location.pathname;

    if(prevProps.location.pathname !== path) {
      const selected = path === '/' ? 'Top' : 'New';

      if(!this.state[selected]) {
        this.setState({error: null});
  
        getPosts(selected)
          .then(data => {
            Promise.all(data.slice(0, 50).map(postId => getPostDetails(postId)))
              .then(posts => this.setState({[selected]: posts}))
              .catch(error => this.setState({error: error.message}))
          })
          .catch(error => this.setState({error: error.message}));
      }
    }
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const path = this.props.location.pathname;
    const selected = path === '/' ? 'Top' : 'New';
    const {error} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
            {!error && !this.state[selected]
              ? <Loading text={`Fetching ${selected} Stories`}/>
              : null} 

              {error && <p className='error'>ERROR: {error}</p>}

            {this.state[selected] && <PostList posts={this.state[selected]}/>}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}