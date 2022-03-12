import React from 'react';
import PropTypes from 'prop-types';

export default function Nav({selected, handleClick}) {
  const storyTypes = ['Top', 'New'];

  return (
    <ul className="container nav row">
      {storyTypes.map(type => (
        <li 
          key={type} 
        > 
          {selected 
            ? <button
                className="btn link"
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
  )
} 

Nav.propTypes = {
  selected: PropTypes.string,
  handleClick: PropTypes.func
}