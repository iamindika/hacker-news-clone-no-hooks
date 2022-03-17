import React from 'react';
import ReactDOM from 'react-dom';
import News from './components/News';
import User from './components/User';
import CommentList from './components/CommentList';
import {ThemeContext} from './contexts/theme';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => this.setState(({theme}) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <News/>
      </ThemeContext.Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);