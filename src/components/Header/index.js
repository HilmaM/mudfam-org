import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled, Box as Box1 } from '@mui/system';
import ChromeReader from '@mui/icons-material/ChromeReaderModeTwoTone';
import PermContactCalendar from '@mui/icons-material/PermContactCalendarTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import InfoIcon from '@mui/icons-material/Info';

import styles from "../../assets/jss/material-kit-react/headerStyle.js";
import ToggleDrawer from './drawer.js';

const useStyles = makeStyles(styles);

const pages = [
  { icon: <ChromeReader sx={{ mr: 0.5, width: 16 }} />, label: 'Blog', url: '/blog' },
  { icon: <StoreTwoToneIcon sx={{ mr: 0.5, width: 16 }} />, label: 'Products', url: '/store' },
  { icon: <InfoIcon sx={{ mr: 0.5, width: 16 }} />, label: 'About', url: '/about' },
  { icon: <PermContactCalendar sx={{ mr: 0.5, width: 16 }} />, label: 'Contacts', url: '/contactus' }
];

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const BoxContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    width: 'auto'
  }
}));

const Appbar = (props) => {
  const classes = useStyles();
  
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const appBarClasses = classNames({
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });

  const brandComponent = (
    <Box1
      component={Link}
      to='/'
      sx={{
        typography: 'h6',
        textAlign: 'left',
        textTransform: 'uppercase',
        fontWeight: 700,
        fontFamily: 'Monospace',
        color: 'ghostwhite',
        fontSize: '1.5rem',
        textDecoration: 'none'
      }}
    >{brand}</Box1>
  );

  return (
    <ElevationScroll {...props}>
      <AppBar
        enableColorOnDark
        sx={{ borderRadius: "0px !important" }}
        className={classes[appBarClasses]}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BoxContainer
              sx={{
                p: 1,
                textOverFlow: 'ellipsis',
                display: { xs: 'none', md: 'flex' },
                mr: 2
              }}
            >
              {brandComponent}
            </BoxContainer>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <ToggleDrawer />
            </Box>
            <BoxContainer
              sx={{
                flexGrow: 1,
                textOverFlow: 'ellipsis',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              {brandComponent}
            </BoxContainer>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                  <Button
                    key={page.label}
                    component={Link}
                    to={page.url}
                    sx={{ 
                      my: 2, 
                      color: 'white',
                      textDecoration: 'none',
                      display: 'flex'
                    }}
                  >
                    {page.icon}
                    {page.label}
                  </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {rightLinks}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

AppBar.defaultProps = {
  color: 'transparent'
}

AppBar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};

export default Appbar;
