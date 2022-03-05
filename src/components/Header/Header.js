import * as React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @mui/material components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box2 from '@mui/material/Box';

// @mui/icons
import Menu from "@mui/icons-material/Menu";
import { Box, styled } from '@mui/system';

// core components
import styles from "../../assets/jss/material-kit-react/headerStyle.js";

const useStyles = makeStyles(styles);

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

export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const brandComponent = (
    <BoxContainer
      sx={{
        p: 1, 
        border: '1px dashed #9e10d3',
        textOverFlow: 'ellipsis'
      }}
    >
      <Box
        component={Button}
        sx={{
          typography: 'h5',
          textAlign: 'left',
          textTransform: 'uppercase',
          fontWeight: 500,
          fontFamily: 'Monospace',
          color: 'ghostwhite'
        }}
      >{brand}</Box>
    </BoxContainer>
  );

  return (
    <Box sx={{ flexGrow: 1, borderRadius: 0 }}>
      <ElevationScroll {...props}>
        <AppBar
          elevation={0}
          enableColorOnDark
          sx={{ borderRadius: "0px !important" }}
        >
          <Toolbar>
            {
              leftLinks !== undefined ? (
                <BoxContainer>
                  {leftLinks}
                </BoxContainer>
              ) : (
                brandComponent
              )
            }
            <Box sx={{ flexGrow: 1 }} />
            {rightLinks}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}

Header.propTypes = {
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
