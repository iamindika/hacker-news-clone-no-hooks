import React from 'react';
import PropTypes from 'prop-types';
import {getDateString} from '../utils/date';

export default function Posts({posts}) {
  return (
    <section className="container grid">
      {posts.map(post => (
        <article 
          className="post"
          key={post.id}  
        >
          <h2>
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
      ))}
    </section>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}