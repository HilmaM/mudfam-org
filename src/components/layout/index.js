import * as React from "react";
import { Link, Outlet } from "react-router-dom";

import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';

// Local components
import Footer from "../Footer/Footer";
import Appbar from "../Header";
import ProfileSection from "../Header/profilePopup";
import useAuth from '../auth';
import CustomizedAlert from "../Alert";

const dashboardRoutes = [];

const AppLayout = (props) => {
  const { ...rest } = props;
  const auth = useAuth();
  return (
    <Box
      sx={{
        width: {
          mobile: 100,
          laptop: 300
        },
        minHeight: "100vh",
        bgcolor: "background.paper",
        p: 0,
        m: 0
      }}
    >
      <Appbar
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 200,
          color: 'info'
        }}
        brand="Mudfam"
        rightLinks={
          auth.user 
            ?
              <ProfileSection />
            :
              <Tooltip title="Account Login">
                <IconButton
                  component={Link}
                  to='/account/login'
                  variant="filled"
                  color='inherit'
                  size='large'
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>
        }
      />
      <CustomizedAlert />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default AppLayout;