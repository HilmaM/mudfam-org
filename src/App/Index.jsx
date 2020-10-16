import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
=======
import { Route, Switch, Redirect, Link, useLocation } from 'react-router-dom';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
import { Navbar, Container } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { 
  faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab, faAngleDoubleUp, faMapMarker, faPhone, faEnvelopeOpen, faDonate, faDotCircle, faRecycle, faReply, faArchive, faGlobeAfrica, faNewspaper, faSpinner, faPencilAlt, faPaperclip, faThumbsUp, faUserCircle, faSignInAlt
);

<<<<<<< HEAD
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { PrivateRoute, Footer } from '@/_components';
import { HomeIndex } from '../HomePage/HomeIndex';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { PagesIndex } from '@/Pages/Index';
import { NavigationBar } from '@/navBar';
=======
import { Role } from '../_helpers';
import { accountService } from '../_services';
import { Footer, PrivateRoute } from '../_components';
import { Home } from '../HomePage';
import { Admin } from '../admin';
import { Account } from '../account';
import { PoetryPageRouter } from '../PoetryPage';
import { Alert, NavigationBar } from '../navBar';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
import { AdminNav } from '../navBar/AdminNavbar';
import { Profile } from '../profile/Index';

function App () {
  const { pathname } = useLocation();
   
  const [user, setUser] = useState({});

  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);

  return (
    <>
      <Container className={user}>
        <header className="blog-header py-3">
          <Navbar className="row flex-nowrap justify-content-between align-items-center">
            <NavigationBar />
          </Navbar>
        </header>
        <AdminNav />
<<<<<<< HEAD
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <PrivateRoute exact path="/" component={HomeIndex} />
          <Route path="/pages" component={ PagesIndex } />
          <PrivateRoute path="/profile" component={Profile} /> 
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
          <Route path="/home" component={ HomeIndex } />
=======
        <div>
          <Alert />
        </div>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/pages" component={ PoetryPageRouter } />
          <PrivateRoute path="/profile" component={Profile} /> 
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
          <Route path="/account" component={Account} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export { App };