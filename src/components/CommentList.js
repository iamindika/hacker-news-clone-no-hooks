import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import CommentItem from './CommentItem';
import {ThemeContext} from '../contexts/theme';
import {getPostDetails} from '../utils/api';

export default class CommentList extends React.Component {
  state = {
    comments: null,
    error: null
  }

  componentDidMount() {
    Promise.all(this.props.ids.map(id => getPostDetails(id)))
      .then(comments => {
        const filteredComments = comments.filter(comment => !comment.deleted);

        this.setState({comments: filteredComments});
      })
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {comments, error} = this.state;

    return (
      <section className="grid">
        {error && <p className="error">Error: {error}</p>}

        {!comments && !error 
          ? <Loading text="Fetching Comments"/>
          : null}

        {comments && comments.length 
          ? comments.map(comment => (
            <CommentItem 
              key={comment.id}
              comment={comment}
            />))
          : null}
      </section>
    )
  }
}

Comment.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired
}