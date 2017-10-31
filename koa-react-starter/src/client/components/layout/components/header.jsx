import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUser } from 'resources/user/user.actions';
import * as fromUser from 'resources/user/user.selectors';

import { indexPath } from '../paths';

import styles from './header.styles';

class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={styles.header}>
        <Link
          className={styles.title}
          to={indexPath()}
        >
          Paralect Koa React Starter
        </Link>

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
