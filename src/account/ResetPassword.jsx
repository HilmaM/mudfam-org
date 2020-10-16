import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';

<<<<<<< HEAD
import { accountService, alertService } from '@/_services';
=======
import { accountService, alertService } from '../_services';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
import { InputGroup, Button, Row, Col } from 'react-bootstrap';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
<<<<<<< HEAD
    <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
    <input className={"form-control" + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
    {meta.touched && meta.error ? (
      <StyledErrorMessage>{meta.error}</StyledErrorMessage>
    ) : null}
  </>);
};

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`;

const StyledLabel = styled.label`
  color: blue;
  font-size: 22px;
`
=======
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input form-control" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error" >{meta.error}</div>
    ) : null}
  </>);
};
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

function ResetPassword({ history }) {
  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
  }
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(location.search);

    // remove token from url to prevent http referer leakage
    history.replace(location.pathname);

    accountService.validateResetToken(token)
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
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
        onSubmit={({password, confirmPassword}, {setSubmitting}) => {
          alertService.clear();
          accountService.resetPassword({token, password, confirmPassword}, {token})
            .then(() => {
              alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
              history.push('login');
            })
            .catch(error => {
              setSubmitting(false);
              alertService.error(error);
            });
        }}
      >
        {({ isSubmitting }) => {
          <Form>
            <Row fluid>
              <FormGroup as={Col} md={6} >
                <MyTextField 
                  label="Enter Your New Password"
                  name="password"
<<<<<<< HEAD
                  type="password"
=======
                  type="text"
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
                />
              </FormGroup>
              <FormGroup as={Col} md={6} >
                <MyTextField 
                  label="Re-Enter to Confirm Your Password"
                  name="confirmPassword"
<<<<<<< HEAD
                  type="password"
=======
                  type="text"
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
                />
              </FormGroup>
            </Row>
            <Row fluid className="p-4" >
              <Button type="submt" className="btn btn-secondary btn-md" disabled={isSubmitting} >
                {isSubmitting && <span className="fa fa-spinner" ></span>}
                Reset Password
              </Button>
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </Row>
          </Form>
        }}
      </Formik>
    );
  }
<<<<<<< HEAD


=======


>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Reset Password</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
};

export { ResetPassword }; 