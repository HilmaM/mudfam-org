import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { 
  faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab, faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt
);

import { Role } from '@/_helpers';
import { Nav, PrivateRoute } from '@/_components';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { FooterSection } from '../home/footer';
import { HomeIndexPage } from '../home/homeIndex';

function App() {
  const { pathname } = useLocation();

  return (
    <div id="home">
          <Nav />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={HomeIndexPage} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <Route path="/home" component={HomeIndexPage} />
        <Route path="/account" component={Account} />
        <Redirect from="*" to="/" />
      </Switch>
      <FooterSection />
    </div>
  );
}

export { App }; 