import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import News from './components/News';
import User from './components/User';
import CommentWrapper from './components/CommentWrapper';
import {ThemeContext} from './contexts/theme';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => this.setState(({theme}) => ({
      theme: theme === 'light' ? 'dark' : 'light'
    }))
  }

  render() {
    return (
      <Router>
        <ThemeContext.Provider value={this.state}>
          <Nav/>

          <Route exact path='/' component={News}/>
          <Route path='/new' component={News}/>
          <Route path='/user' component={User}/>
          <Route path='/post' component={CommentWrapper}/>
        </ThemeContext.Provider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);