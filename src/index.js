import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Loading from './components/Loading';
import {ThemeContext} from './contexts/theme';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';

const News = React.lazy(() => import('./components/News'));
const User = React.lazy(() => import('./components/User'));
const CommentWrapper = React.lazy(() => import('./components/CommentWrapper'));
const FourOFour = React.lazy(() => import('./components/FourOFour'));

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

          <React.Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path='/' component={News}/>
              <Route path='/new' component={News}/>
              <Route path='/user' component={User}/>
              <Route path='/post' component={CommentWrapper}/>
              <Route component={FourOFour}/>
            </Switch>
          </React.Suspense>
        </ThemeContext.Provider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);