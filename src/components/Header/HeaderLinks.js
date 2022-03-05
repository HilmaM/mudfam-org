/*eslint-disable*/
import * as React from "react";
// react components for routing our app without refresh
import { Link, useNavigate } from "react-router-dom";

// @mui/material components
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// @mui/icons
import { Apps, Bookmark, Facebook, GitHub, YouTube } from "@mui/icons-material";
import ChromeReader from '@mui/icons-material/ChromeReaderModeTwoTone';
import PermContactCalendar from '@mui/icons-material/PermContactCalendarTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import InfoIcon from '@mui/icons-material/Info';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
// import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-kit-react/headerLinksStyle.js";
import { Can } from '../../_helpers';
import useAuth from '../auth';
import ProfileSection from "./profilePopup.js";

const useStyles = makeStyles(styles);

const navs = [
  { icon: <ChromeReader sx={{ width: '16px', height: '16px', marginRight: '3px' }} />, label: 'Blog', url: '/blog' },
  { icon: <StoreTwoToneIcon sx={{ width: '16px', height: '16px', marginRight: '3px' }} />, label: 'Store', url: '/store' },
  { icon: <InfoIcon sx={{ width: '16px', height: '16px', marginRight: '3px' }} />, label: 'About Us', url: '/about' },
  { icon: <PermContactCalendar sx={{ width: '16px', height: '16px', marginRight: '3px' }} />, label: 'Contact Us', url: '/contactus' },
  {
    icon: <ProfileSection />, url: '#', label: "Profile"
  }
];

export default function HeaderLinks(props) {
  const classes = useStyles();
  const auth = useAuth();
  const { user, logout } = auth;
  const navigate = useNavigate();

  return (
    <Stack direction='row'>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
      </Box>
      {
        navs.map((nav) => (
          <Box
            key={nav.label}
            className={classes.listItem}
            sx={{ m: .5 }}
          >
            <ButtonBase
              sx={{ borderRadius: 0 }}
            >
              <Button
                component={Link}
                to={nav.url}
                sx={{ backgroundColor: 'transparent' }}
                startIcon={nav.icon}
              >
                {nav.label}
              </Button>
            </ButtonBase>
          </Box>
        ))
      }
      <Box
        sx={{
          display:{
            xs: 'flex'
          }
        }}
      ></Box>
    </Stack>
  );
}

/*
<List className={classes.list}>
<ListItem className={classes.listItem}>
  <Can
    role={user && user.role}
    perform="dashboard-page:visit"
    yes={() => (
      <CustomDropdown
        noLiPadding
        buttonText={ user ? user.last_name : 'Profile' }
        buttonProps={{
          className: classes.navLink,
          color: "transparent"
        }}
        buttonIcon={Apps}
        dropdownList={[
          <Can
            role={user && user.role}
            perform="admin:admin"
            yes={() => (
              <Link
                to="/admin"
                className={classes.dropdownLink}
              >
                Admin Settings
              </Link>
            )}
          />,
          <Link 
            to="/profile"
            className={classes.dropdownLink}
          >
            Profile view
          </Link>,
          <Link 
            to={`/profile/update/${user && user.id}`}
            className={classes.dropdownLink}
          >
            Profile update
          </Link>,
          <Link
            to="/main/write"
            className={classes.dropdownLink}
          >
            Write Post
          </Link>,
          <Link 
            to="/" 
            className={classes.dropdownLink} 
            onClick={() => logout(() => navigate('/', {replace: true}))}
          >
            Logout
          </Link>
        ]}
      />
    )}
    no={() => (
      <Button
        component={Link}
        to="/account/login"
        color="transparent"
        className={classes.navLink}
      >
        <LockOpenIcon className={classes.icons} /> Login
      </Button>
    )}
  />
</ListItem>
<ListItem className={classes.listItem}>
  <Button
    component={Link}
    to="/main"
    color="transparent"
    className={classes.navLink}
  >
    <Bookmark className={classes.icons} /> Blog
  </Button>
</ListItem>
<ListItem className={classes.listItem}>
  <Tooltip
    id="youtube"
    title="Follow us on youtube"
    placement={window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      href="https://www.youtube.com/channel/UCq2OdrAmhqWixS4Y3aM86bw/featured"
      target="_blank"
      color="transparent"
      className={classes.navLink}
    >
      <YouTube className={classes.socialIcons}/>
    </Button>
  </Tooltip>
</ListItem>
<ListItem className={classes.listItem}>
  <Tooltip
    id="instagram-facebook"
    title="Follow us on facebook"
    placement={window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      color="transparent"
      href="https://www.facebook.com/mapenzi.mudimba"
      target="_blank"
      className={classes.navLink}
    >
      <Facebook className={classes.socialIcons} />
    </Button>
  </Tooltip>
</ListItem>
<ListItem className={classes.listItem}>
  <Tooltip
    id="instagram-github"
    title="Follow us on instagram"
    placement={window.innerWidth > 959 ? "top" : "left"}
    classes={{ tooltip: classes.tooltip }}
  >
    <Button
      color="transparent"
      href="https://github.com/HilmaM"
      target="_blank"
      className={classes.navLink}
    >
      <GitHub className={classes.socialIcons} />
    </Button>
  </Tooltip>
</ListItem>
</List>*/