import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { 
  faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt, faSearch, faFilePdf, faEdit, faMobileAlt, faVolleyballBall, faFootballBall, faLaptop, faCampground, faGamepad, faMusic, faUserFriends, faUsersCog
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab, faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt, faSearch, faFilePdf, faEdit, faMobileAlt, faVolleyballBall, faFootballBall, faLaptop, faCampground, faGamepad, faMusic, faUserFriends, faUsersCog
);

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { PrivateRoute, Footer } from '@/_components';
import { HomeIndex } from '../HomePage/HomeIndex';
import { Admin } from '@/admin/Index';
import { Account } from '@/account/Index';
import { PagesIndex } from '@/Pages/Index';
import { NavigationBar } from '@/navBar';
import { AdminNav } from '../navBar/AdminNavbar';
import { Profile } from '../profile/Index';
import { Author } from '../about';

function App () {
  const { pathname } = useLocation();
   
  const [user, setUser] = useState({});

  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);

  return (
    <section className={user}>
      <header className="blog-header this-bg">
        <Navbar className="row flex-nowrap justify-content-between align-items-center">
          <NavigationBar />
        </Navbar>
      </header>
      <Container>
        <AdminNav />
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <PrivateRoute exact path="/" component={HomeIndex} />
          <Route path="/pages" component={ PagesIndex } />
          <PrivateRoute path="/profile" component={Profile} /> 
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
          <Route path="/home" component={ HomeIndex } />
          <Route path="/account" component={Account} />
          <Route path="/author" component={ Author } />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </section>
  );
}

export { App };