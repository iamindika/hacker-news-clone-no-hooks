import React from 'react';
import ReactDOM from 'react-dom';
import News from './components/News';
import User from './components/User';
import './index.css';

function App(props) {
  return (
    <React.Fragment>
      <User/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);