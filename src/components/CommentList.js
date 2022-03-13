import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import Post from './Post';
import {getPostDetails} from '../utils/api';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        post: null,
        comments: null,
        error: null
      }
  }

  componentDidMount() {
    getPostDetails(this.props.id)
      .then(post => this.setState({post}))
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate() {
    const {post, comments} = this.state;

    if(post && post.kids && !comments) {
      Promise.all(post.kids.map(commentId => getPostDetails(commentId)))
        .then(comments => this.setState({comments}))
        .catch(error => this.setState({error}))
    }
  }

  render() {
    const {post, comments, error} = this.state;
    console.log(comments);
    return (
      <React.Fragment>
        <Nav/>
        
        {!post && !error 
          ? <Loading text="Fetching Post"/>
          : null}

        {post && (
          <div 
            className="container"
            style={{marginTop: '2rem'}}
          >
            <Post 
              post={post}
              size={3}  
            />
          </div> 
        )}

        {post && !comments
          ? <Loading text="Fetching Comments"/>
          : null}

        {error && <p className="error">{error}</p>}
      </React.Fragment>
    )
    }
}

CommentList.propTypes = {
  id: PropTypes.number.isRequired
}

CommentList.defaultProps = {
  id: 30660534
}