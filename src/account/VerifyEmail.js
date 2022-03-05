/* eslint-disable */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import { accountService, alertService } from '_services';
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import Button from 'components/CustomButtons/LoadingButton.js';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

function VerifyEmail(props) {
  const EmailStatus = {
    Verifying: 'Verifying',
    Failed: 'Failed'
  };
  const classes = useStyles();

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { token } = queryString.parse(location.search);

    // remove token from url to prevent http referer leakage
    props.history.replace(location.pathname);

    accountService.verifyEmail(token)
      .then(() => {
        alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
        props.history.push('/account/login');
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <span>Verifying... </span>;
      case EmailStatus.Failed:
        return <span>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</span>;
    };
  };

  return (
    <form className={classes.form}>
      <CardHeader color="primary" className={classes.cardHeader}>
        <h4>Verify Email</h4>
      </CardHeader>
      <CardBody>
        {getBody()}
      </CardBody>
      <CardFooter className={classes.cardFooter}>
      <Button 
        simple
        color="primary" 
        size="lg"
        type="submit"
        disabled
      >
        Resetting ...
      </Button>
      </CardFooter>
    </form>
  );
}; 

export { VerifyEmail }; 