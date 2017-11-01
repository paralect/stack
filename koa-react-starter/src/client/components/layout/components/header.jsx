import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import FaCaretDown from 'react-icons/lib/fa/caret-down';

import { fetchUser } from 'resources/user/user.actions';
import * as fromUser from 'resources/user/user.selectors';

import {
  indexPath,
  profilePath,
  changePasswordPath,
} from '../paths';

import styles from './header.styles';

class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  state = {
    showMenu: false,
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

        <span
          className={classnames(styles.user, {
            [styles.showMenu]: this.state.showMenu,
          })}
        >
          {this.props.username}
          <FaCaretDown size={20} />

          <div className={styles.menu}>
            <Link to={profilePath()}>Profile</Link>
            <Link to={changePasswordPath()}>Change Password</Link>
          </div>
        </span>
      </div>
    );
  }
}

export default connect(state => ({
  username: fromUser.getUsername(state),
}), {
  fetchUser,
})(Header);
