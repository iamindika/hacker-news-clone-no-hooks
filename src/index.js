import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {getStories} from './utils/api';
import {getDateString} from './utils/date';
import './index.css';

function StoriesNav({selected, handleClick}) {
  const storyTypes = ['Top', 'New'];

  return (
    <ul className="container nav row">
      {storyTypes.map(type => (
        <li 
          key={type} 
        >
          <button
            className="btn link"
            style={selected === type ? {color: '#FF0800'} : null}
            onClick={() => handleClick(type)}
          >{type}</button>
        </li>
      ))}
    </ul>
  )
} 

StoriesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

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
            &nbsp;comments
          </p>
        </article>
      ))}
    </section>
  );
}

StoriesGrid.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired
}

class App extends React.Component {
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
      .catch(error => this.setState({error}));
  }

  componentDidUpdate() {
    const {selected} = this.state;

    if(!this.state[selected]) {
      getStories(selected)
        .then(stories => this.setState({
          [selected]: stories,
          error: null
        }))
        .catch(error => this.setState({error}));
    } else {
      getStories(selected)
        .then(stories => {
          if(this.state[selected][0].id !== stories[0].id) {
            this.setState({
              [selected]: null,
              error: null
            });

            this.setState({[selected]: stories});
          }
        })
        .catch(error => this.setState({error}));
    }
  }

  handleClick(type) {
    this.setState({selected: type})
  }

  render() {
    const {selected, error} = this.state;

    return (
      <React.Fragment>
        <StoriesNav 
          selected={this.state.selected}
          handleClick={this.handleClick}
        /> 

        {error && <p>{error}</p>}

        {!this.state[selected] && !error 
          ? <p>Loading...</p>
          : <StoriesGrid stories={this.state[selected]}/>}
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);