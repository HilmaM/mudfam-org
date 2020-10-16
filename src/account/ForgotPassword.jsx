import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Row, Col } from 'react-bootstrap';
<<<<<<< HEAD
import styled from '@emotion/styled';
=======

import { accountService, alertService } from '../_services';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input form-control" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error" >{meta.error}</div>
    ) : null}
  </>);
};
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f


const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
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

function ForgotPassword() {
  return (<Formik
      initialValues={{
        email: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid Email')
          .required('Email field should be filled!')
      })}
      onSubmit={(fields, {setSubmitting}) => {
        alertService.clear();
        accountService.forgotPassword(fields)
          .then(() => alertService.success('Please check your email for Password reset instructions'))
          .catch(error => alertService.error(error))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => {
        return (<Form>
          <h3 className="card-header" >Forgot Password</h3>
          <div className="card-body" >
            <FormGroup>
              <MyTextField 
                label="Email"
                name="email"
<<<<<<< HEAD
                type="email"
=======
                type="text"
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
              />
            </FormGroup>
            <Row>
              <FormGroup as={Col} >
                <Button type="submit" disabled={isSubmitting} >
                  {isSubmitting && 
                    <span className="fa fa-spinner fa-spin" ></span>
                  }
                  Confirm
                </Button>
                <Link to="login" className="btn btn-link">Cancel</Link>
              </FormGroup>
            </Row>
          </div>
        </Form>)
      }}
    </Formik>);
}

export { ForgotPassword }; 