import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { FormGroup, Col, Button, Row } from 'react-bootstrap';

import { accountService, alertService } from '@/_services';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
    <input className={'form-control' + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
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

function LoginPage ({ history }) {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService.login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
      {( { isSubmitting } ) =>
        (
          <Form >
            <h3 className="card-header">Login</h3>
            <Row className="card-body">
              <Col md={{ span: 6, offset: 1 }} >
                <Row>
                  <Col md="auto" className="p-2" >
                    <FormGroup md={6} >
                      <MyTextField
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </FormGroup>
                    <FormGroup md={6} >
                      <MyTextField
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={5} className="p-4" >
                    <Row>
                      <Button type="submit" className="btn btn-info" disabled={isSubmitting} >
                        {isSubmitting &&
                          <span className="fa fa-spinner fa-pulse" ></span>
                        } 
                        <span className="fa fa-sign-in" ></span> Login
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={{ span:4, offset:1 }} >
                <p className="text-right">New account<Link to="register"  className="btn btn-link pr-0" >Registration</Link></p>
                <p className="text-right" >
                  <Link to="forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                </p>
              </Col>
            </Row>
          </Form>
        )
      }
    </Formik>
  )
};

export { LoginPage };