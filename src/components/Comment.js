import React from 'react';
import PropTypes from 'prop-types';
import {getDateString} from '../utils/date';
import {createMarkup} from '../utils/api';

export default function Comment({comment}) {
  return (
    <article className="comment">
      <p className="desc">
        by <a href="#">{comment.by}</a> on
        &nbsp;{getDateString(comment.time)}
      </p>
      <div 
        className="comment__text"
        dangerouslySetInnerHTML={createMarkup(comment.text)}
      />
    </article>
  )
}