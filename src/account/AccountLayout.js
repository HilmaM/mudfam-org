/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Outlet } from 'react-router-dom';

// @mui components
import { styled, alpha, createTheme } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

// @mui/icons-material
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';

import styles from "../assets/jss/helper/views/loginPage.js";
import image from "../assets/img/bg7.jpg";
import Card from '../components/Card/Card';

const useStyles = makeStyles(styles);

const AccountLayout = () => {
  const theme = createTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  // Animate the card
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  return (
    <Box
      className={classes.pageHeader}
      sx={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={classes.container}>
        <GridContainer justifyContent='center' alignItems='center'>
          <GridItem xs={10} md={4}>
            <Card className={classes[cardAnimaton]}>
              {/** Outlet to the rest of the Account Api */}
              <Outlet />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </Box>
  );
}

export default AccountLayout;