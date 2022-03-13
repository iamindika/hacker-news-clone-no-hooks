import React from 'react';
import PropTypes from 'prop-types';
import {getDateString} from '../utils/date';

export default function Post({post, size}) {
  return (
    <article 
      className="post" 
    >
      <h2 style={{fontSize: size.toString() + 'rem'}}>
        <a  
          href={post.url}
          className="post__title"
        >{post.title}</a> 
      </h2>
      <p className="desc">
        by <a href="#">{post.by}</a> on
        &nbsp;{getDateString(post.time)} with
        &nbsp;<a href="#">{post.kids ? post.kids.length : 0}</a>
        &nbsp;ranked comments
      </p>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

Post.defaultProps = {
  size: 1.75
}