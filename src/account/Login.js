import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

// @mui/material components
import { makeStyles } from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { CircularProgress, Tooltip } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";

// @material-ui/icons
import { Fingerprint, PersonAdd, PersonPin } from '@mui/icons-material';
import Email from "@mui/icons-material/Email";
import LoginIcon from '@mui/icons-material/Login';

// Core Components
import Button from '../components/CustomButtons/Button.js';
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import styles from "../assets/jss/helper/views/loginPage.js";
import useAuth from "../components/auth";
import { alertService } from '../_services/alert.service.js';

// Declared Variables and Instances
// for this instance of the project
const useStyles = makeStyles(styles);

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const MyTextField = ({label, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <CustomInput
      labelText={label}
      id={props.name}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        endAdornment: props.type === 'email' ? (
          <InputAdornment position="end">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <Fingerprint className={classes.inputIconsColor} />
          </InputAdornment>
        ),
        error: meta.touched && Boolean(meta.error),
        ...field,
        ...props,
      }}
      error={meta.touched && Boolean(meta.error)}
    />
  );
}

// Final Exported Project instance
export default function LoginPage(){
  const classes = useStyles();
  const auth = useAuth();
  const { signin, scm, erm, user } = auth;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({email, password}, { setStatus, setSubmitting }) => {
        setStatus()
        setSubmitting(true);
        signin(email, password).then(() => {
          const { from } = location.state || { from: { pathname: "/" } };

          setSubmitting(false);
          navigate(from, { replace: true });
          alertService.success('Welcome '+ user ? user.first_name : undefined+'!', { keepAfterRouteChange: true });
        }).catch((error) => {
          alertService.error(error);
          setSubmitting(false);
          console.log(error);
        });
      }}
    >
    {({ isSubmitting }) =>
      <Form className={classes.form} >
        <CardHeader color="info" className={classes.cardHeader}>
          <h4>Login</h4>
          <div className={classes.socialLine}>
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
              title="Forgot Username"
              placement="right"
            >
              <Button
                justIcon
                component={Link}
                to="/account/login"
                color="transparent"
                size="sm"
              >
                <Email />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>
        <p className={classes.divider}>Classical login</p>
        <CardBody>
          <MyTextField 
            type='email'
            name='email'
            label='Email'
          />
          <MyTextField 
            type='password'
            name='password'
            label='Password'
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <LoadingButton 
            color="primary" 
            fullWidth 
            size="large" 
            type="submit" 
            variant="contained"
            startIcon={<LoginIcon />}
            loadingPosition="start"
            loading={isSubmitting}
          >
            Sign In
          </LoadingButton>
        </CardFooter>
      </Form>
    }
    </Formik>
  );
};
