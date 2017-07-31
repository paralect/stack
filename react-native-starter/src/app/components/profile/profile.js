import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import * as fromUser from 'app/resources/user/user.selectors';
import { updateUser } from 'app/resources/user/user.actions';
import Input from 'app/components/common/input';
import Button from 'app/components/common/button';
import './profile.styles';


class Profile extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    username: '',
    info: '',
  }

  updateUser = () => {
    this.props.updateUser(this.state);
    this.props.history.push('/');
  }

  onUsernameChange = username => {
    this.setState({ username });
  }

  onInfoChange = info => {
    this.setState({ info });
  }

  render() {
    const { user, history } = this.props;

    return (
      <View>
        <Text>Profile</Text>
        <Input defaultText={user.username} onChange={this.onUsernameChange} />
        <Input defaultText={user.info} onChange={this.onInfoChange} />
        <Button to="/">
          <Text onPress={this.updateUser}>Edit</Text>
        </Button>
        <Button to="/">
          <Text>Cancel</Text>
        </Button>
      </View>
    );
  }
}

export default connect(state => ({
  user: fromUser.getUser(state),
}), {
  updateUser,
})(Profile);
