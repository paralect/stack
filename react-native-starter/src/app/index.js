import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';

import store from './resources/store';
import Layout from './components/layout';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Layout />
        </NativeRouter>
      </Provider>
    );
  }
}
