import React from 'react';
import Loading from './Loading';
import Post from './Post';
import Comment from './Comment';
import {ThemeContext} from '../contexts/theme';
import {getPostDetails} from '../utils/api';
import queryString from 'query-string';

const style = {
  paddingTop: '2rem',
  minHeight: '100vh'
}
export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        post: null,
        error: null
      }
  }

  componentDidMount() {
    const {id} = queryString.parse(this.props.location.search);

    getPostDetails(id)
      .then(post => this.setState({post}))
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    const {post, error} = this.state;

    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <div className={`bg-${theme}`}>
            {!post && <Loading text="Fetching Post"/>}

            {error && <p className='error'>ERROR: {error}</p>}

            {post && (
              <div 
                className="container"
                style={style}
              >
                <Post 
                  post={post}
                  size={3}  
                />

                {/* {post.descendants && <Comment comments={post.kids.slice(0, 50)}/>} */}
              </div> 
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}