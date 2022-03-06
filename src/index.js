import React from 'react';
import ReactDOM from 'react-dom';
import { getTopStories } from './utils/api';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'Top'
    }
  }

  render() {
    const {selected} = this.state;
    const storyTypes = ['Top', 'New'];

    return (
      <ul className="container nav row">
        { storyTypes.map(type => (
          <li 
            key={type} 
          >
            <button
              className="btn"
              style={selected === type ? {color: 'red'} : null}
              onClick={() => this.setState({ selected: type })}
            >{type}</button>
          </li>
        ))}
      </ul>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);