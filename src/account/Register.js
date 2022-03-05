/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// @mui/material
import Autocomplete from '@mui/material/Autocomplete';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  Stack
 } from '@mui/material';

// @mui/icons-material
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Core Components
import { countries, gender } from '@/constant.js';
import useScriptRef from '../components/scriptRef';
import useAuth from '@/components/auth';
import Google from '../assets/images/social-google.svg';
import AnimateButton from '../settings/animateButton';
import TermsOfUse from '../components/terms';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

// constant styles
const RedButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  backgroundColor: theme.palette.grey[50],
  border: '1px solid',
  borderColor: theme.palette.grey[100],
  color: theme.palette.grey[700],
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem'
  }
}));

const SigninText = styled(Button)(({ theme }) => ({
  cursor: 'unset',
  margin: theme.spacing(2),
  padding: '5px 56px',
  borderColor: `${theme.palette.grey[100]} !important`,
  color: `${theme.palette.grey[900]}!important`,
  fontWeight: 500
}));

const LoginIcon = styled('img')(({ theme }) => ({
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '8px'
  }
}));

const MyAutocomplete = ({label, ...props}) => {
  return (
    <Autocomplete
      id={props.id}
      sx={{ width: '100%' }}
      options={props.options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      values={props.values}
      onChange={props.onChange}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {
            props.id === 'select-country' 
              ? `${option.label (option.code) + option.phone}`
              : option.label
          }
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill,
          }}
          label={label}
          helperText={props.helperText}
          error={props.error}
          success={props.success}
        />
      )}
    />
  );
}

// Register Component
const RegisterPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const auth = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: '',
      home_address: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      acceptTerms: false
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string()
        .required('First Name is required'),
      last_name: Yup.string()
        .required('Last Name is required'),
      gender: Yup.string()
        .required('Gender is required'),
      home_address: Yup.string()
        .required('Home Address is required'),
      country: Yup.string()
        .required('Please prodive a country'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .when('password', (password, schema) => {
          if (password) return schema.required('Confirm Password is required');
        })
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      bio: Yup.string()
        .max(128, 'Maximum of 128 characters reached'),
      acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Terms & Conditions to proceed with registration process.')
    }),
    onSubmit: (values, { setSubmitting }) => {
      auth.register(values, () => {
        setSubmitting(false);
        navigate('/account/login', { replace: true });
      });
    }
  });

  return (
    <>
    <Grid item xs={12}>
      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
        <Grid item>
          <Stack alignItems="center" justifyContent="center" spacing={1}>
            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
              Sign up
            </Typography>
            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
              Enter your credentials to continue
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <RedButton disableElevation fullWidth size="large" variant="contained">
              <LoginIcon src={Google} alt="google" width="20px" sx={{ mr: { xs: 1, sm: 2 } }} /> Sign up with Google
            </RedButton>
          </AnimateButton>
        </Grid> 
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <AnimateButton>
              <SigninText
                variant="outlined"
                sx={{ borderRadius: `3px` }}
                disableRipple
                disabled
              >
                OR
              </SigninText>
            </AnimateButton>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box
            sx={{
              mb: 2
            }}
          >
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>
      {/** Put the Formik contexts here */}
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name='first_name'
              id='first-name'
              label='First Name'
              type='text'
              fullWidth
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='last_name'
              id='last-name'
              label='Last Name'
              type='text'
              fullWidth
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='select-gender'
              name='gender'
              label='Gender'
              type='text'
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name='home_address'
              id='home-address'
              label='Home Address'
              type='text'
              fullWidth
              value={formik.values.home_address}
              onChange={formik.handleChange}
              error={formik.touched.home_address && Boolean(formik.errors.home_address)}
              helperText={formik.touched.home_address && formik.errors.home_address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='select-country'
              fullWidth
              name='country'
              type='text'
              label='Country'
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              value={formik.values.country}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name='bio'
              id='bio'
              label='Bio'
              type='text'
              fullWidth
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ mt: 2 }}>
          <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-register"
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text--register">
              {' '}
              {formik.errors.email}{' '}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ mt: 2 }}>
          <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-register"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            name="password"
            label="Password"
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
              changePassword(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-register">
              {' '}
              {formik.errors.password}{' '}
            </FormHelperText>
          )}
        </FormControl>

        {strength !== 0 && (
          <FormControl fullWidth>
            <Box
              sx={{
                mb: 2
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    backgroundColor={level.color}
                    sx={{
                      width: 85,
                      height: 8,
                      borderRadius: '7px'
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
              }
              label={
                <TermsOfUse />
              }
            />
          </Grid>
        </Grid>
        {formik.errors.submit && (
          <Box
            sx={{
              mt: 3
            }}
          >
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Box
          sx={{
            mt: 2
          }}
        >
          <AnimateButton>
            <Button disableElevation disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
              Sign up
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </Grid>
    <Grid item xs={12}>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Grid item container direction="column" alignItems="center" xs={12}>
        <Typography component={Link} to="/account/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
          Have an account?
        </Typography>
      </Grid>
    </Grid>
    </>
  );
};

export default RegisterPage;
