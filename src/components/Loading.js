import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  state = {
    content: this.props.text
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
      <div className="loading">
        <p>{content}</p>
      </div>
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