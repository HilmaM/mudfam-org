import React from 'react';
import { render } from 'react-dom';
import { history } from './_helpers';
import { accountService } from './_services';

import './styles.less';

import { App } from './App';
import { Router } from 'react-router-dom';

function startApp() { 
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );
};

startApp();