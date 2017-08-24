import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as fromUser from 'resources/user/user.selectors';
import { updateUser } from 'resources/user/user.actions';
import Input from 'components/common/input';
import Button from 'components/common/button';
import './profile.styles';


class Profile extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired,
  }

  state = {
    username: '',
    info: '',
  }

  updateUser = () => {
    this.props.updateUser(this.state);
  }

  onUsernameChange = username => {
    this.setState({ username });
  }

  onInfoChange = info => {
    this.setState({ info });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Profile</h1>
        <Input defaultText={user.username} onChange={this.onUsernameChange} />
        <Input defaultText={user.info} onChange={this.onInfoChange} />
        <Button to="/" text="Edit" onClick={this.updateUser} />
        <Button to="/" text="Cancel" />
      </div>
    );
  }
}

export default connect(state => ({
  user: fromUser.getUser(state),
}), {
  updateUser,
})(Profile);
