import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/layout';
import store from './resources/store';


ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
),
  document.getElementById('root') // eslint-disable-line
);
