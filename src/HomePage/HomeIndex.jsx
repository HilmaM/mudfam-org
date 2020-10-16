import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './WelcomePage';

function HomeIndex({ match }) {
  const { path } = match;

  return (<>
    <Switch>
      <Route exact path={`${path}`} component={Home} />
    </Switch>
  </>);
};

export { HomeIndex };
