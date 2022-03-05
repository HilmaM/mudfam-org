// scroll bar
// import 'simplebar/src/simplebar.css';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";

import App from './App';
import { accountService } from './_services';

// Silently start the app
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>,
    document.getElementById('app')
  );
}
