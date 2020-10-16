import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Pages } from './landing';
import { Poetry } from './Poetry/Index';

function PagesIndex ({ match }) {

  const { path } = match;

  return (
    <div role="main">
      <Switch>
        <Route exact path={path} component={Pages} />
        <Route path={`${path}/poetry`} component={Poetry} />
      </Switch>
    </div>
  );
}; 

export { PagesIndex };