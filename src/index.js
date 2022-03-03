import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <React.Component>
      <h1>Hello Clover & Scruffy!</h1>
      <p>I miss you Scruffy!!</p>
    </React.Component>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);