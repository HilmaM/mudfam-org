import React from 'react';
import { render } from 'react-dom';
import { history } from './_helpers';

import './styles.less';

import { App } from './App/Index';
import { Router } from 'react-router-dom';

function startApp() { 
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('app')
  );
};

startApp();
