import React from 'react';

import Button from 'components/common/button';
import './index.styles';


export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <Button to="/profile" text="Edit Profile" />
      </div>
    );
  }
}
