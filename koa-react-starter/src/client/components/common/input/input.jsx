import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.styles';


export default class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <textarea
        className={styles.input}
        onChange={this.onChange}
        value={this.props.value}
      />
    );
  }
}
