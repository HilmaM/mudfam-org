import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './Overview';
import { Users } from './users';
import { Alert } from '../_components';
import { Miscel } from './miscel';

function Admin({ match }) {
  const { path } = match;

  return (<>
    <div className="p-4">
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path={path} component={Overview} />
          <Route path={`${path}/users`} component={Users} />
          <Route path={`${path}/miscel`} component={Miscel} />
        </Switch>
      </div>
    </div>
  </>);
}

export { Admin };