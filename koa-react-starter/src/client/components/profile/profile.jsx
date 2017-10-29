import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as fromUser from 'resources/user/user.selectors';
import { updateUser } from 'resources/user/user.actions';
import Input from 'components/common/input';
import Button from 'components/common/button';

class Profile extends React.Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      info: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    const { user = {} } = props;
    this.state = {
      username: user.username || '',
      info: user.info || '',
    };
  }

  componentWillReceiveProps(props) {
    const { user } = props;
    if (user.username !== this.state.username || user.info !== this.state.info) {
      this.setState({
        username: user.username,
        info: user.info,
      });
    }
  }

  onInfoChange = (info) => {
    this.setState({ info });
  }

  onUsernameChange = (username) => {
    this.setState({ username });
  }

  updateUser = () => {
    this.props.updateUser(this.state);
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>

        <Input
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <Input
          value={this.state.info}
          onChange={this.onInfoChange}
        />

        <Button to="/" text="Edit" onClick={this.updateUser} tabIndex={0} />
        <Button to="/" text="Cancel" tabIndex={-1} />
      </div>
    );
  }
}

export default connect(state => ({
  user: fromUser.getUser(state),
}), {
  updateUser,
})(Profile);
