import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PoetryCorner, PoemContainer, PoemList, PoemPost } from './';
import { PoemWriter } from './makePoem';

function PoetryPageRouter ({ match }) {

  const { path } = match;

  return (
    <div role="main">
      <PoetryCorner />
      <Switch>
        <Route exact path={path} component={PoemContainer} />
        <Route path={`${path}/write`} component={PoemWriter} />
        <Route path={`${path}/edit/:id`} component={PoemWriter} />
        <Route path={`${path}/:id`} component={PoemPost} />
      </Switch>
    </div>
  );
}; 

export { PoetryPageRouter };