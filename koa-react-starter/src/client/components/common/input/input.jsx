import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.styles';


export default class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,

    defaultText: PropTypes.string.isRequired,
  }

  state = {
    text: '',
  }

  componentDidMount = () => {
    this.setState({ text: this.props.defaultText });
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <textarea
        className={styles.input}
        onChange={this.onChange}
        value={this.state.text}
      />
    );
  }
}
