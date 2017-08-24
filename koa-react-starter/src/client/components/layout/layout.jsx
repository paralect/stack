import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUser } from 'resources/user/user.actions';
import Routes from 'components/routes';
import Header from './components/header';
import './layout.styles';


class Layout extends React.Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Header />

        <div className="page">
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  fetchUser,
})(Layout));
