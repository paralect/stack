import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import styles from './input.styles';


export default class Input extends React.Component {
  static propsTypes = {
    onChange: PropTypes.func.isRequired,

    defaultText: PropTypes.string.isRequired,
  }

  state = {
    text: '',
  }

  componentDidMount = () => {
    this.setState({ text: this.props.defaultText });
  }

  onChange = text => {
    this.setState({ text });
    this.props.onChange(text);
  }

  render() {
    return (
      <TextInput
        autoCapitalize="none"
        style={styles.container}
        onChangeText={this.onChange}
        value={this.state.text}
      />
    );
  }
}
