import React from 'react';
import { render } from 'react-dom';
import { history } from './_helpers';
import { accountService } from './_services';

import './styles.less';

import { App } from './App/Index';
import { Router } from 'react-router-dom';

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() { 
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    render(
      <Router history={history}>
        <App />
      </Router>,
      document.getElementById('app')
    )
  }).catch(error => 'An error occurred while loading the component');
}

startApp().then(component => {
  document.body.appendChild(component);
});