import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Scroll Bar
import PerfectScrollbar from 'react-perfect-scrollbar';

// MUI components
import Popper from '@mui/material/Popper';
import Chip from '@mui/material/Chip';
import IconSettings from '@mui/icons-material/AdminPanelSettings';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import UserEditIcon from '@mui/icons-material/EditRounded';
import { EditNotifications } from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Settings from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

// Custom components imports
import Transitions from '@/settings/Transition';
// import FormDialog from '@/components/Dialog';
import useAuth from '@/components/auth';
import profile from '../../assets/img/faces/christian.jpg';

const menuId = 'primary-search-account-menu';

const NavList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  minWidth: '300px',
  backgroundColor: alpha(theme.palette.background.paper, 0.65),
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%'
  }
}));

const ProfileChip = styled(Chip)(({ theme }) => ({
  height: '32px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: alpha(theme.palette.primary.light, 0.35),
  backgroundColor: alpha(theme.palette.primary.dark, 0.75),
  '&[aria-controls=`${menuId}`], &:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.27),
    background: `${alpha(theme.palette.success.main, 0.27)}!important`,
    color: alpha(theme.palette.success.dark, 0.55),
    '& svg': {
      stroke: alpha(theme.palette.success.light, 0.42)
    }
  }
}));

const Scrollbar = styled(PerfectScrollbar)({
  height: '100%',
  maxHeight: 'calc(100vh - 250px)',
  overflowX: 'hidden'
});

const MainCard = styled(Card)(({ theme }) => ({
  ...theme.shadows[16],
  marginTop: '16px',
  marginBottom: '16px'
}));

const ProfileSection = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const {user, signout} = auth;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (!user) return null;

  return (<>
    <Tooltip title="Open settings">
      <IconButton
        onClick={handleToggle}
        sx={{ p: 0 }}
        variant="filled"
        ref={anchorRef}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
      >
        <Avatar alt={user.first_name} src={profile} />
      </IconButton>
    </Tooltip>
    <Popper
      id={menuId}
      open={open}
      onClose={handleMenuClose}
      placement="bottom-end"
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]
      }}
    >
      {({ TransitionProps }) => (
        <Transitions in={open} {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleMenuClose}>
              <MainCard elevation={16} boxshadow='true'>
                <CardContent
                  sx={{ padding: '16px !important' }}
                >
                  <Grid container direction='column' spacing={0}>
                    <Card elevation={3} sx={{ marginTop: '16px', marginBottom: '16px', backgroundColor: '#21e0fe' }}>
                      <CardContent sx={{ padding: '10px !important'}}>
                        <Grid item sx={{ display: 'flex' }}>
                          <Typography variant='h4' sx={{ fontWeight: 400, marginLeft: '2px' }}>
                            {user.last_name+ ' '+ user.first_name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='subtitle2'>
                            {user.role}
                          </Typography>
                        </Grid>
                        <Divider />
                        <Grid item sx={{ paddingTop: '8px'}} >
                          <Stack 
                            justifyContent='space-between'
                            spacing={2}
                            direction='row'
                          >
                            <Chip
                              variant='filled'
                              color='primary'
                              icon={<AccountCircle size='small' />}
                              size='small'
                              label='Profile'
                              onClick={handleMenuClose}
                              component={Link}
                              to={'/profile'}
                            />
                            <Chip
                              variant='filled'
                              color='success'
                              size='small'
                              label='Edit'
                              icon={<UserEditIcon size='small' />}
                              onClick={handleMenuClose}
                              component={Link}
                              to={'/profile/update'}
                            />
                            {/*<FormDialog 
                              actionTitle='Delete User'
                              dialogContent={
                                `You are about to delete ${user.first_name}'s user data. You will lose all the content and the action is not reversible. Are you sure?`
                              }
                            />*/}
                          </Stack>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Divider />
                    {
                      user.role === 'Admin'
                        ?
                          <Card sx={{ marginTop: '16px', marginBottom: '16px', backgroundColor: '#9a1ef0' }}>
                            <CardContent>
                              <Grid container direction='column' spacing={3}>
                                <Grid item>
                                  <Grid item container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                      <Typography 
                                        variant='subtitle2'
                                        color='ghostwhite'
                                      >
                                        Administrator
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Chip
                                        component={Link}
                                        to='/admin'
                                        color='warning'
                                        icon={<IconSettings />}
                                        size='medium'
                                        onClick={handleMenuClose}
                                        label='Admin Panel'
                                        variant='filled'
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid item container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                      <Typography 
                                        variant='subtitle2'
                                        color='ghostwhite'
                                      >
                                        Make a notice
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Chip
                                        component={Link}
                                        to='/notices'
                                        color='success'
                                        icon={<EditNotifications size='small' />}
                                        size='medium'
                                        onClick={handleMenuClose}
                                        label='Notify'
                                        variant='filled'
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        : undefined
                    }
                    <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
                      <CardContent>
                        <Grid container direction='column' spacing={3}>
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography
                                  component='h6'
                                  variant='body2'
                                  color='inherit'
                                >
                                  Write a blog
                                </Typography>
                              </Grid>
                              <Grid item>
                                {/** Put the Writer Code here 
                                <Writer /> */}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography
                                  component='h6'
                                  variant='subtitle1'
                                  color='inherit'
                                >
                                  Store manager
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant='body2'>
                                  Store
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <NavList component='nav'>
                      <ListItemButton
                        sx={{ marginTop: '5px', borderRadius: '14px' }}
                        onClick={() => signout(() => navigate('/', { replace: true }))}
                      >
                        <ListItemIcon>
                          <Logout />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant='body2'>Logout</Typography>
                          }
                        />
                      </ListItemButton>
                    </NavList>
                </CardContent>
              </MainCard>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </Popper>
  </>);
}

export default ProfileSection;