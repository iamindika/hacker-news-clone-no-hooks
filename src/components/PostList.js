import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default function PostList({posts}) {
  return (
    <section className="container grid">
      {posts.map(post => (
        <Post
          key={post.id}  
          post={post}
        />
      ))}
    </section>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}