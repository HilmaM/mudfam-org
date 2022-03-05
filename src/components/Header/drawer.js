import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// @mui/icons-material
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ChromeReader from '@mui/icons-material/ChromeReaderModeTwoTone';
import PermContactCalendar from '@mui/icons-material/PermContactCalendarTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import InfoIcon from '@mui/icons-material/Info';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationIcon from '@mui/icons-material/Notifications';
import UserIcon from '@mui/icons-material/VerifiedUserTwoTone';
import Logout from '@mui/icons-material/Logout';

import { 
  styled, 
  ThemeProvider, 
  createTheme, 
} from '@mui/material/styles';

//Local imports
import useAuth from '@/components/auth';

// Data
const data = [
  { icon: <InfoIcon />, label: 'About', url: 'about'  },
  { icon: <StoreTwoToneIcon />, label: 'Products', url: 'store'  },
  { icon: <PermContactCalendar />, label: 'Contact Us', url: 'contactus'  },
  { icon: <ChromeReader />, label: 'Blog', url: 'blog'  },
  { icon: <NotificationIcon />, label: 'Notices', url: 'notices'}
];

// Nav List
const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const ToggleDrawer = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const toggleDrawerOpen = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(true);
  };

  const toggleDrawerClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenDrawer(false);
  };

  return (<>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-haspopup="true"
      ref={anchorRef}
      aria-controls={openDrawer ? 'open-mobile-drawer' : undefined}
      color="inherit"
      onClick={toggleDrawerOpen}
      onKeyDown={toggleDrawerOpen}
    >
      <MenuIcon />
    </IconButton>
    <Drawer
      anchor='left'
      open={openDrawer}
      onClose={toggleDrawerOpen}
      role="presentation"
      aria-label='open-mobile-drawer'
      id='open-mobile-drawer'
    >
      <Box
        sx={{ display: 'flex' }}
      >
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 246)' },
              background: { paper: 'rgb(5, 30, 52)' },
            },
          })}
        >
            <Paper elevation={0} sx={{ maxWidth: 256 }}>
              <ClickAwayListener onClickAway={toggleDrawerClose}>
                <FireNav component="nav" disablePadding>
                  <ListItemButton component="a" href="#home">
                    <ListItemIcon sx={{ fontSize: 16 }}>
                      <Avatar>MF</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      sx={{ my: 0 }}
                      primary="Muimba Family"
                      primaryTypographyProps={{
                        fontSize: 17,
                        fontWeight: 'medium',
                        letterSpacing: 0,
                      }}
                    />
                  </ListItemButton>
                  <Divider />
                  <ListItem component="div" disablePadding>
                    <ListItemButton sx={{ height: 56 }}>
                      <ListItemIcon>
                        <Home color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Settings Home"
                        primaryTypographyProps={{
                          color: 'primary',
                          fontWeight: 'medium',
                          variant: 'body2',
                        }}
                      />
                    </ListItemButton>
                    <Tooltip title="Project Settings">
                      <IconButton
                        size="large"
                        sx={{
                          '& svg': {
                            color: 'rgba(255,255,255,0.8)',
                            transition: '0.2s',
                            transform: 'translateX(0) rotate(0)',
                          },
                          '&:hover, &:focus': {
                            bgcolor: 'unset',
                            '& svg:first-of-type': {
                              transform: 'translateX(-4px) rotate(-20deg)',
                            },
                            '& svg:last-of-type': {
                              right: 0,
                              opacity: 1,
                            },
                          },
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            height: '80%',
                            display: 'block',
                            left: 0,
                            width: '1px',
                            bgcolor: 'divider',
                          },
                        }}
                      >
                        <Settings />
                        <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                  <Divider />
                  <Box
                    sx={{
                      bgcolor: openMenu ? 'rgba(71, 98, 130, 0.2)' : null,
                      pb: openMenu ? 2 : 0,
                    }}
                  >
                    <ListItemButton
                      alignItems="flex-start"
                      onClick={() => setOpenMenu(!openMenu)}
                      sx={{
                        px: 3,
                        pt: 2.5,
                        pb: openMenu ? 0 : 2.5,
                        '&:hover, &:focus': { '& svg': { opacity: openMenu ? 1 : 0 } },
                      }}
                    >
                      <ListItemText
                        primary="Links"
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: 'medium',
                          lineHeight: '20px',
                          mb: '2px',
                        }}
                        secondary="Authentication, Database Setup, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                        secondaryTypographyProps={{
                          noWrap: true,
                          fontSize: 12,
                          lineHeight: '16px',
                          color: openMenu ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                        }}
                        sx={{ my: 0 }}
                      />
                      <KeyboardArrowDown
                        sx={{
                          mr: -1,
                          opacity: 0,
                          transform: openMenu ? 'rotate(-180deg)' : 'rotate(0)',
                          transition: '0.2s',
                        }}
                      />
                    </ListItemButton>
                    {openMenu &&
                      data.map((item) => (
                        <ListItemButton
                          key={item.label}
                          sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                          component={Link}
                          to={item.url}
                          onClick={toggleDrawerClose}
                        >
                          <ListItemIcon sx={{ color: 'inherit' }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                          />
                        </ListItemButton>
                      ))}
                      {
                        openMenu && !auth.user && 
                        <ListItemButton
                          sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                          component={Link}
                          to='/account/login'
                          onClick={toggleDrawerClose}
                        >
                          <ListItemIcon sx={{ color: 'inherit' }}>
                            <LockOpenIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary='Login'
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                          />
                        </ListItemButton>
                      }
                  </Box>
                  {
                    auth.user 
                      ?
                        <>
                        <Divider />
                        <Box
                          sx={{
                            bgcolor: openMenu ? 'rgba(71, 98, 130, 0.2)' : null,
                            pb: openMenu ? 2 : 0,
                          }}
                        >
                          <ListItemButton
                            component={Link}
                            to='/profile'
                            sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                            onClick={toggleDrawerClose}
                          >
                            <ListItemIcon>
                              <UserIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="View Profile"
                              primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            />
                          </ListItemButton>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            bgcolor: openMenu ? 'rgba(71, 98, 130, 0.2)' : null,
                            pb: openMenu ? 2 : 0,
                          }}
                        >
                          <ListItemButton
                            onClick={
                              () => auth.signout(() => navigate('/', { replace: true }))
                            }
                          >
                            <ListItemIcon>
                              <Logout />
                            </ListItemIcon>
                            <ListItemText
                              primary="Logout"
                              primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            />
                          </ListItemButton>
                        </Box>
                        </>
                      : undefined
                  }
                </FireNav>
              </ClickAwayListener>
            </Paper>
        </ThemeProvider>
      </Box>
    </Drawer>
  </>);
}

export default ToggleDrawer;