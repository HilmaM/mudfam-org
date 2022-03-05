import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @mui/material components
import { makeStyles } from "@mui/styles";
import { Tooltip, Box, Divider } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";

// @material-ui/icons
import { Fingerprint, PersonAdd, PersonPin } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/ArrowBack';
import ChromeReader from '@mui/icons-material/ChromeReaderModeTwoTone';
import PermContactCalendar from '@mui/icons-material/PermContactCalendarTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import InfoIcon from '@mui/icons-material/Info';

// Core Components
import Button from '../CustomButtons/Button.js';
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
import styles from "../../assets/jss/helper/views/loginPage.js";

// Declared Variables and Instances
// for this instance of the project
const useStyles = makeStyles(styles);

// Final Exported Project instance
export default function AccountNoMatch(){
  const classes = useStyles();
  const navigate = useNavigate();

  return (<>
    <CardHeader color="info" className={classes.cardHeader}>
      <h4>Fail! Try these links</h4>
      <div className={classes.socialLine}>
        <Divider textAlign='center'>
          Account Links
        </Divider>
        <Box
          sx={{
            justifyContent: 'space-around'
          }}
        >
          <Tooltip
            id="forgot-password-field"
            title="Forgot password"
            placement="left"
          >
            <Button
              justIcon
              component={Link}
              to="/account/forgot-password"
              color="transparent"
              size="sm"
            >
              <PersonPin />
            </Button>
          </Tooltip>
          <Tooltip
            id="register-new-account"
            title="Register"
            placement="bottom"
          >
            <Button
              justIcon
              component={Link}
              to="/account/register"
              color="transparent"
              size="sm"
            >
              <PersonAdd />
            </Button>
          </Tooltip>
          <Tooltip
            id="Forgot-username-reset"
            title="Login"
            placement="right"
          >
            <Button
              justIcon
              component={Link}
              to="/account/login"
              color="transparent"
              size="sm"
            >
              <Fingerprint />
            </Button>
          </Tooltip>
        </Box>
        <Divider textAlign='center'>
          Navigation Links
        </Divider>
        <Box
          sx={{
            justifyContent: 'space-around'
          }}
        >
          <Tooltip
            id="blog-posts-section"
            title="Check the blog"
            placement="left"
          >
            <Button
              justIcon
              component={Link}
              to="/blog"
              color="transparent"
              size="sm"
            >
              <ChromeReader />
            </Button>
          </Tooltip>
          <Tooltip
            id="MF-products"
            title="Check the products"
            placement="bottom"
          >
            <Button
              justIcon
              component={Link}
              to="/store"
              color="transparent"
              size="sm"
            >
              <StoreTwoToneIcon />
            </Button>
          </Tooltip>
          <Tooltip
            id="Contact us"
            title="Contact Us"
            placement="bottom"
          >
            <Button
              justIcon
              component={Link}
              to="/contactus"
              color="transparent"
              size="sm"
            >
              <PermContactCalendar />
            </Button>
          </Tooltip>
          <Tooltip
            id="author"
            title="Site author"
            placement="right"
          >
            <Button
              justIcon
              component={Link}
              to="/author"
              color="transparent"
              size="sm"
            >
              <InfoIcon />
            </Button>
          </Tooltip>
        </Box>
      </div>
    </CardHeader>
    <p className={classes.divider}>404 - Page Not Found</p>
    <CardBody>
      <Box
        sx={{
          typography: 'h3',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 20,
          fontFamily: 'Monospace'
        }}
      >
        OOOPS! The page is still under construction.
        Check back later.
      </Box>
    </CardBody>
    <CardFooter className={classes.cardFooter}>
      <LoadingButton 
        color="primary" 
        fullWidth 
        size="large" 
        type="button" 
        variant="contained"
        startIcon={<LoginIcon />}
        loadingPosition="start"
        onClick={() => navigate(-1, {replace: true})}
      >
        Back
      </LoadingButton>
    </CardFooter>
    </>
  );
};
