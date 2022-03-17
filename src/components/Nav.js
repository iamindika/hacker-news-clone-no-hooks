import React from 'react';
import PropTypes from 'prop-types';
import {ThemeContext} from '../contexts/theme';
import {MdLightMode, MdDarkMode} from 'react-icons/md';

export default function Nav({selected, handleClick}) {
  const storyTypes = ['Top', 'New'];

  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <div className="container nav row">
          <ul className="nav__list row">
            {storyTypes.map(type => (
              <li 
                key={type} 
              > 
                {selected 
                  ? <button
                      className={`btn link ${theme === 'dark' && 'light-link'}`}
                      style={selected === type ? {color: '#FF0800'} : null}
                      onClick={() => handleClick(type)}
                    >{type}</button>
                  : <a 
                      className="link"
                      href="#"
                    >{type}</a>}
              </li>
            ))}
          </ul>
          <div onClick={toggleTheme}>
            {theme === 'dark' 
              ? <MdLightMode 
                  className='icon'
                  color={'rgb(250, 240, 230)'}
                  size={40}
                />
              : <MdDarkMode 
                  className='icon'
                  size={40}
                />}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
} 

Nav.propTypes = {
  selected: PropTypes.string,
  handleClick: PropTypes.func
}