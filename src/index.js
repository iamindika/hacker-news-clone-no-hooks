import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getTopStories } from './utils/api';
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
      selected: 'Top'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    return (
      <StoriesNav 
        selected={this.state.selected}
        handleClick={this.handleClick}
      /> 
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);