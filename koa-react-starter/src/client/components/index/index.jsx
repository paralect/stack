import React from 'react';

import Button from 'components/common/button';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <Button to="/profile" text="Edit Profile" tabIndex="0" />
      </div>
    );
  }
}
