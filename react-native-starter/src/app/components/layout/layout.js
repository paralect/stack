import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withRouter } from 'react-router-native';

import { fetchUser } from 'app/resources/user/user.actions';
import Routes from 'app/components/routes';
import Header from './components/header';
import styles from './layout.styles';


class Layout extends React.Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchUser();
  }

  render() {
    return (
      <View>
        <Header />

        <View style={styles.page}>
          <Routes />
        </View>
      </View>
    );
  }
}

export default withRouter(connect(null, {
  fetchUser,
})(Layout));
