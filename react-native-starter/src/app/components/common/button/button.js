import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Link } from 'react-router-native';

import styles from './button.styles';


export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Link style={styles.container} to={this.props.to}>
        {this.props.children}
      </Link>
    );
  }
}
