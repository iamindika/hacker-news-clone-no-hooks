import React from 'react';
import {ThemeContext} from '../contexts/theme';
import {MdLightMode, MdDarkMode} from 'react-icons/md';
import {NavLink} from 'react-router-dom';

const activeStyle = {
  color: '#FF0800'
}

export default function Nav(props) {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <div className={`bg-${theme}`}>
          <div className="container nav row">
            <ul className="nav__list row">
              <li> 
                <NavLink
                  exact
                  to="/"
                  activeStyle={activeStyle}
                  className={
                    `link ${theme === 'dark' ? 'light-link' : 'dark-link'}`
                  }
                >Top</NavLink>
              </li>
              <li> 
                <NavLink
                  to="/new"
                  activeStyle={activeStyle}
                  className={
                    `link ${theme === 'dark' ? 'light-link' : 'dark-link'}`
                  }
                >New</NavLink>
              </li>
            </ul>
            <div onClick={toggleTheme}>
              {theme === 'dark' 
                ? <MdLightMode 
                    className='icon'
                    color={'rgb(253, 255, 0)'}
                    size={40}
                  />
                : <MdDarkMode 
                    className='icon'
                    size={40}
                  />}
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}