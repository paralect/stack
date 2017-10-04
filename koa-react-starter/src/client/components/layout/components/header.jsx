import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from 'resources/user/user.actions';

import * as fromUser from 'resources/user/user.selectors';
import styles from './header.styles';

class Header extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={styles.header}>
        {this.props.username}
      </div>
    );
  }
}

export default connect(state => ({
  username: fromUser.getUsername(state),
}), {
  fetchUser,
})(Header);
