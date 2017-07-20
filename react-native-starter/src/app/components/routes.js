import React from 'react';
import { Route } from 'react-router-native';
import { View } from 'react-native';

import Index from './index';
import Profile from './profile';


export default class Routes extends React.Component {
  render() {
    return (
      <View>
        <Route exact path="/" component={Index} />
        <Route path="/profile" component={Profile} />
      </View>
    );
  }
}
