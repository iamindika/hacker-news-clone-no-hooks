import React from 'react';
import PropTypes from 'prop-types';
import {ThemeContext} from '../contexts/theme';

const style = {
  content: {
    marginTop: '2rem',
    textAlign: 'center',
    color: 'inherit',
    fontSize: '2rem',
    fontWeight: '600',
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text
    }
  }

  componentDidMount() {
    const {text, speed} = this.props;

    this.interval = window.setInterval(() => this.state.content === text + '...'
      ? this.setState({content: text})
      : this.setState(({content}) => ({content: content + '.'}))
    , speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const {content} = this.state;

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <div style={{color: theme === 'dark' ? '#FFF' : '#000'}}>
            <p style={style.content}>{content}</p>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}