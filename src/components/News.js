import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Loading from './Loading';
import {getStories} from '../utils/api';
import {getDateString} from '../utils/date';

function StoriesGrid({stories}) {
  return (
    <section className="container grid">
      {stories.map(story => (
        <article 
          className="story"
          key={story.id}  
        >
          <h2>
            <a  
              href={story.url}
              className="story__title"
            >{story.title}</a> 
          </h2>
          <p className="story__desc">
            by <a href="#">{story.by}</a> on
            &nbsp;{getDateString(story.time)} with
            &nbsp;<a href="#">{story.kids ? story.kids.length : 0}</a>
            &nbsp;ranked comments
          </p>
        </article>
      ))}
    </section>
  );
}

StoriesGrid.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'Top',
      error: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {selected} = this.state;

    getStories(selected)
      .then(stories => this.setState({[selected]: stories}))
      .catch(error => this.setState({error: error.message}));
  }

  componentDidUpdate(prevProps, prevState) {
    const {selected} = this.state;

    if(prevState.selected !== selected && !this.state[selected]) {
      this.setState({error: null});

      getStories(selected)
        .then(stories => this.setState({
          [selected]: stories,
        }))
        .catch(error => this.setState({error: error.message}));
    }
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const {selected, error} = this.state;

    return (
      <React.Fragment>
        <Nav 
          selected={this.state.selected}
          handleClick={this.handleClick}
        />

        {!error && !this.state[selected]
          ? <Loading text={`Fetching ${selected} Stories`}/>
          : null} 

        {error && <p className="error">ERROR: {error}</p>}

        {this.state[selected] && <StoriesGrid stories={this.state[selected]}/>}
      </React.Fragment>
    )
  }
}