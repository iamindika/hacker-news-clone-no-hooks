import React from 'react';
import PropTypes from 'prop-types';
import {ThemeContext} from '../contexts/theme';
import {getDateString} from '../utils/date';
import {createMarkup} from '../utils/api';

export default function Comment({comment}) {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <article className={`comment comment--${theme}`}>
          <p className="desc">
            by <a href="#" 
                  className={
                    `${theme === 'dark' ? 'light' : 'dark'}-link`
                  }>{comment.by}</a> on
            &nbsp;{getDateString(comment.time)}
          </p>
          <div 
            className="comment__text"
            dangerouslySetInnerHTML={createMarkup(comment.text)}
          />
        </article>
      )}
    </ThemeContext.Consumer>
  )
}