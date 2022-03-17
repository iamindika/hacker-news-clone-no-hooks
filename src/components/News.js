import React from 'react';
import Nav from './Nav';
import Loading from './Loading';
import PostList from './PostList';
import {getPosts, getPostDetails} from '../utils/api';
import {ThemeContext} from '../contexts/theme';

export default class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'Top',
      error: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {selected} = this.state;

    getPosts(selected)
      .then(data => {
        Promise.all(data.slice(0, 50).map(postId => getPostDetails(postId)))
          .then(posts => this.setState({[selected]: posts}))
      })
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate(prevProps, prevState) {
    const {selected} = this.state;

    if(prevState.selected !== selected && !this.state[selected]) {
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

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const {selected, error} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
            <Nav 
              selected={this.state.selected}
              handleClick={this.handleClick}
            />

            {!error && !this.state[selected]
              ? <Loading text={`Fetching ${selected} Stories`}/>
              : null} 

              {error && (
                <div className="error">
                  <p className={
                    `error__text error__text--${theme === 'light' ? 'dark' : 'light'}`
                  }>ERROR: {error}</p>
                </div>
              )}

            {this.state[selected] && <PostList posts={this.state[selected]}/>}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}