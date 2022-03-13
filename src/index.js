import React from 'react';
import ReactDOM from 'react-dom';
import News from './components/News';
import User from './components/User';
import Comments from './components/Comments';
import './index.css';

function App(props) {
  return (
    <React.Fragment>
      <Comments/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);