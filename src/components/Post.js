import React from 'react';
import PropTypes from 'prop-types';
import {ThemeContext} from '../contexts/theme';
import {getDateString} from '../utils/date';

export default function Post({post, size}) {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <article 
          className="post" 
        >
          <h2 style={{fontSize: size.toString() + 'rem'}}>
            <a  
              href={post.url}
              className={`post__title post__title--${theme === 'dark' && 'light'}`}
            >{post.title}</a> 
          </h2>
          <p className="desc">
            by <a className={theme === 'dark' ? 'light-link' : 'dark-link'} 
                  href="#">{post.by}</a>
            &nbsp;on {getDateString(post.time)} with
            &nbsp;<a  className={theme === 'dark' ? 'light-link' : 'dark-link'} 
                      href="#">{post.kids ? post.kids.length : 0}</a>
            &nbsp;ranked comments
          </p>
        </article>
      )}
    </ThemeContext.Consumer>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

Post.defaultProps = {
  size: 1.75
}