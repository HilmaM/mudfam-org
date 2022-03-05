import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// mui/material
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik, useField } from 'formik';

// project imports
import useAuth from '@/components/auth';

const EmailField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  const theme = useTheme();

  return (
    <FormControl 
      fullWidth 
      error={Boolean(meta.touched && meta.error)} 
      sx={theme.typography.customInput}
    >
      <InputLabel htmlFor="outlined-adornment-email-login">
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email-login"
        type="email"
        label={label}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-email-login">
          {' '}
          {meta.error}{' '}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const ForgotPassword = (props, { ...others }) => {
  const theme = useTheme();
  const location = useLocation();
  const auth = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  let from = location.state?.from?.pathname || "/";

  return (
    <>
        <Grid item xs={12}>
          <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
            <Grid item>
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h5' : 'h3'}>
                  Forgot password
                </Typography>
                <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                  Enter the email you used to open the account
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box
            sx={{
              mb: 2
            }}
          >
            <Typography variant="subtitle1">Email address</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            })}
            onSubmit={({email}) => {
              auth.forgotPassword(email, () => {
                navigate('/account/login', { replace: true });
              });
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <Stack direction='column' spacing={2}>
                  <EmailField
                    name='email'
                    label="Email Address / Username"
                  />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    component={Link}
                    to="/account/login"
                    color="secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={Link}
                    to="/account/register"
                    color="secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    New account?
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    mt: 2
                  }}
                >
                  <>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                      Verify email
                    </Button>
                  </>
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid item container direction="column" alignItems="center" xs={12}>
          <Typography component={Link} to="/account/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
            Don&apos;t have an account?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassword;
