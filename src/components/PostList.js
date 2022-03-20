import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default function PostList({posts, size = 1.75}) {
  return (
    <section className="container grid">
      {posts.map(post => (
        <Post
          key={post.id}  
          post={post}
          size={size}
        />
      ))}
    </section>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.number
}