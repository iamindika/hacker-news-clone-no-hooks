import React from 'react';
import Nav from './Nav';
import Loading from './Loading';
import Posts from './Posts';
import {getPosts} from '../utils/api';

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
      .then(posts => this.setState({[selected]: posts}))
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate(prevProps, prevState) {
    const {selected} = this.state;

    if(prevState.selected !== selected && !this.state[selected]) {
      this.setState({error: null});

      getPosts(selected)
        .then(posts => this.setState({
          [selected]: posts,
        }))
        .catch(error => this.setState({error: error.message}));
    }
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const {selected, error} = this.state;

    return (
      <React.Fragment>
        <Nav 
          selected={this.state.selected}
          handleClick={this.handleClick}
        />

        {!error && !this.state[selected]
          ? <Loading text={`Fetching ${selected} Stories`}/>
          : null} 

        {error && <p className="error">ERROR: {error}</p>}

        {this.state[selected] && <Posts posts={this.state[selected]}/>}
      </React.Fragment>
    )
  }
}