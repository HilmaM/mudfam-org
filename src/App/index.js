import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Local Imports
import AppLayout from '../components/layout';
import NavigationScroll from '../settings/NavigationScroll';
import AuthProvider from '../components/authProvider';
// import Landing from '../landing';
import Home from '../landing/home';
import AccountIndex from '../account';
import AuthRoute from '../components/AuthRoute';
import PageNoMatch from '../components/404/pageNoMatch';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  spacing: 4,
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appbar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

const App = () => {

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <NavigationScroll>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index path='/' element={<Home />} />
                <Route
                  path="account/*"
                  element={<AuthRoute>
                    <AccountIndex />
                  </AuthRoute>}
                />
                <Route path='*' element={<PageNoMatch />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </NavigationScroll>
    </StyledEngineProvider>
  );
}

export default App;