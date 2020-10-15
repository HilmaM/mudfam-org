import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Landing } from './landing';
import { ContactusMessages } from './messages';
import { AllBlogs } from './blogs';
import { AllSubs } from './subs';

function Miscel({ match }) {
  const { path } = match;
  
  return (
    <Switch>
      <Route exact path={path} component={Landing} />
      <Route path={`${path}/messages`} component={ContactusMessages} />
      <Route path={`${path}/blogs`} component={AllBlogs} />
      <Route path={`${path}/subs`} component={AllSubs} />
    </Switch>
  );
}

export { Miscel };