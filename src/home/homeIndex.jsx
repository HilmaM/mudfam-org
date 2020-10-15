import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutSection } from '../pages/about';
import { ContactusSection } from '../pages/contactus';
import { ManagementSection } from '../pages/management';
import { Blog } from '../pages/blog/Index';
import { WelcomeSection } from './welcome';
import { CommunitySection } from '../pages/community';
import { Gallery } from '../pages/gallery';
import { News } from '../pages/news/Index';
import { SponsorsSection } from './sponsors';

function HomeIndexPage({ match }) {
  const { path } = match;

  return (<>
    <Switch>
      <Route exact path={`${path}`} component={WelcomeSection} />
      <Route path={`${path}/about`} component={AboutSection} />
      <Route path={`${path}/contactus`} component={ContactusSection} />
      <Route path={`${path}/management`} component={ManagementSection} />
      <Route path={`${path}/projects`} component={CommunitySection} />
      <Route path={`${path}/blogposts`} component={Blog} />
      <Route path={`${path}/gallery`} component={Gallery} />
      <Route path={`${path}/news`} component={News} />
      <Route path={`${path}/sponsors`} component={SponsorsSection} />
    </Switch>
  </>);
};

export { HomeIndexPage };
