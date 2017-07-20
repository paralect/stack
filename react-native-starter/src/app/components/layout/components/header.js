import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import * as fromUser from 'app/resources/user/user.selectors';
import styles from './header.styles';


class Header extends React.Component {
  static propsTypes = {
    username: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Text style={styles.container}>
        {this.props.username}
      </Text>
    );
  }
}

export default connect(state => ({
  username: fromUser.getUsername(state),
}))(Header);
