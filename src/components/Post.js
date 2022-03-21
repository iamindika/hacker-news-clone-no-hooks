import React from 'react';
import PropTypes from 'prop-types';
import {ThemeContext} from '../contexts/theme';
import {getDateString} from '../utils/date';
import {Link} from 'react-router-dom';

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
            by <Link className={theme === 'dark' ? 'light-link' : 'dark-link'} 
                    to={{pathname: '/user', search: `?id=${post.by}`}}>{post.by}</Link>
            &nbsp;on {getDateString(post.time)} with
            &nbsp;<Link className={theme === 'dark' ? 'light-link' : 'dark-link'} 
                        to={{
                          pathname: '/post',
                          search: `?id=${post.id}`
                        }}>{post.descendants}</Link>
            &nbsp;comments
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