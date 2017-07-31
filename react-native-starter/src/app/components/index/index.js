import React from 'react';
import { Text, View } from 'react-native';

import Button from 'app/components/common/button';
import styles from './index.styles';


export default class Index extends React.Component {
  render() {
    return (
      <View>
        <Text>Index</Text>
        <Button to="/profile">
          <Text>Edit Profile</Text>
        </Button>
      </View>
    );
  }
}
