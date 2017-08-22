import React from 'react';
import { Route } from 'react-router-dom';

import Index from './index';
import Profile from './profile';


export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Index} />
        <Route path="/profile" component={Profile} />
      </div>
    );
  }
}
