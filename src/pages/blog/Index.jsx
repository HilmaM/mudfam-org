import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BlogpostSection } from './blogposts';
import { BlogMaker } from './blog.maker';

function Blog ({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={`${path}`} component={BlogpostSection} />
      <Route path={`${path}/blog`} component={BlogMaker} />
      <Route path={`${path}/editing/:id`} component={BlogMaker} />
    </Switch>
  )
};

export { Blog };