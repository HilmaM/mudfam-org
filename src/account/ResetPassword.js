/* eslint-disable */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Button from "components/CustomButtons/LoadingButton.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

import { accountService, alertService } from "_services";
import Warning from "components/Typography/Warning.js";
import Info from "components/Typography/Info.js";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  return (
    <CustomInput
      labelText={label}
      id={props.name}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ),
        error: meta.touched && meta.error,
        ...field,
        ...props,
      }}
    />
  );
};

function ResetPassword({ history }) {
  const classes = useStyles();
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(location.search);

    // remove token from url to prevent http referer leakage
    history.replace(location.pathname);

    accountService
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    return (
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={({ password, confirmPassword }, { setSubmitting }) => {
          alertService.clear();
          accountService
            .resetPassword({ token, password, confirmPassword }, { token })
            .then(() => {
              alertService.success(
                "Password reset successful, you can now login",
                { keepAfterRouteChange: true }
              );
              history.push("signin");
            })
            .catch((error) => {
              setSubmitting(false);
              alertService.error(error);
            });
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Resetting your Forgot Password</h4>
              </CardHeader>
              <p className={classes.divider}>Enter new Password</p>
              <CardBody>
                <MyTextField
                  type="password"
                  name="password"
                  label="New Password"
                />
                <MyTextField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color="primary"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  progress={isSubmitting}
                >
                  Reset Password
                </Button>
              </CardFooter>
            </Form>
          );
        }}
      </Formik>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <form className={classes.form}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h4>Verify Email</h4>
            </CardHeader>
            <CardBody>
              <Warning>
                Token validation failed, if the token has expired you can get a
                new one at the <Link to="forgot-password">forgot password</Link>{" "}
                page.
              </Warning>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button simple color="primary" size="lg" type="submit" disabled>
                Can Not Reset
              </Button>
            </CardFooter>
          </form>
        );
      case TokenStatus.Validating:
        return <Info>Validating token...</Info>;
    }
  }

  return <>{getBody()}</>;
}

export { ResetPassword };
