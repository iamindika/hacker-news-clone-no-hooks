import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getStories } from './utils/api';
import './index.css';

function StoriesNav({ selected, handleClick }) {
  const storyTypes = ['Top', 'New'];

  return (
    <ul className="container nav row">
      {storyTypes.map(type => (
        <li 
          key={type} 
        >
          <button
            className="btn"
            style={selected === type ? {color: 'red'} : null}
            onClick={() => handleClick(type)}
          >{type}</button>
        </li>
      ))}
    </ul>
  )
} 

StoriesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

class App extends React.Component {
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

    getStories(selected)
      .then(stories => this.setState({[selected]: stories}))
      .catch(error => this.setState({error}));
  }

  componentDidUpdate() {
    const {selected} = this.state;

    if(!this.state[selected]) {
      getStories(selected)
        .then(stories => this.setState({
          [selected]: stories,
          error: null
        }))
        .catch(error => this.setState({error}));
    } else {
      getStories(selected)
        .then(stories => {
          if(this.state[selected][0].id !== stories[0].id) {
            this.setState({
              [selected]: null,
              error: null
            });

            this.setState({[selected]: stories});
          }
        })
        .catch(error => this.setState({error}));
    }
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const {selected, error} = this.state;

    return (
      <React.Fragment>
        <StoriesNav 
          selected={this.state.selected}
          handleClick={this.handleClick}
        /> 

        {error && <p>{error}</p>}

        {!this.state[selected] && !error 
          ? <p>Loading...</p>
          : <pre>{JSON.stringify(this.state[selected], null, 2)}</pre>}
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);