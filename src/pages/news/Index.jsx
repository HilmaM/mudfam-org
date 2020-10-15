import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NewsPages } from './news.page';
import { NewsWriter } from './news.maker';
import { ArticlePage } from './article';

function News ({ match }) {
  const { path } = match;
  return (<>
    <Switch>
      <Route exact path={`${path}`} component={NewsPages} />
      <Route path={`${path}/write`} component={NewsWriter} />
      <Route path={`${path}/editing/:id`} component={NewsWriter} />
      <Route path={`${path}/read/:id`} component={ArticlePage} />
    </Switch>
  </>)
};

export { News };