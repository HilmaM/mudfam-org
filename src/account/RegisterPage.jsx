import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Col, Button, FormGroup } from 'react-bootstrap';

import { accountService, alertService } from '../_services';
import { Alert } from '../_components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const StyledSelect = styled.select`
  color: black;
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`;

const StyledLabel = styled.label`
  color: blue;
  font-size: 22px;
`

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <StyledLabel className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </StyledLabel>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect className={'form-control' + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

function RegisterPage ({ history }) {

  return (
    <Formik  
      initialValues={{
        title: '',
        first_name: '',
        last_name: '',
        gender: '',
        home_address: '',
        country: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        acceptTerms: false
      }} 
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .required('Title is required'),
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
        phone_number: Yup.string()
          .required('Must be a number'),
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
          .oneOf([true], 'Accept Terms & Conditions is required')
      })} 
      onSubmit={(fields, { setStatus, setSubmitting}) => {
        setStatus();
        accountService.register(fields)
          .then(() => {
            alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
            history.push('login');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }} >
      {
        ({ isSubmitting }) =>  (
          <Form>
            <h3 className="card-header bg-success" >Create New Account</h3>
            <div className="card-body">
              <Alert />
              <div className="form-row" >
                <FormGroup as={Col} >
                  <MySelect
                    name="title"
                    label="Title"
                  >
                    <option value="" disabled={true} >Title...</option>
                    <option value="dr" >Dr</option>
                    <option value="miss" >Miss</option>
                    <option value="mr" >Mr</option>
                    <option value="mrs" >Mrs</option>
                    <option value="ms" >Ms</option>
                    <option value="prof" >Prof</option>
                  </MySelect>
                </FormGroup>
                <FormGroup as={Col} md={5} >
                  <MyTextField 
                    label="Fist Name"
                    name="first_name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup as={Col} md={5} >
                  <MyTextField 
                    label="Surname"
                    name="last_name"
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="3" >
                  <MySelect
                    name="gender"
                    label="Gender"
                  >
                    <option value="" disabled={true} >Choose...</option>
                    <option value="female" >Female</option>
                    <option value="male" >Male</option>
                  </MySelect>
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="12" >
                  <MyTextField 
                    label="Home Address"
                    name="home_address"
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="3" >
                  <MySelect
                    name="country"
                    label="Country"
                  >
                    <option value="" disabled={true} >Choose...</option>
                    <option value="zimbabwe" >Zimbabwe</option>
                    <option value="africa" >Africa</option>
                    <option value="asia" >Asia</option>
                    <option value="america" >America</option>
                    <option value="europe" >Europe</option>
                    <option value="australia" >Australia</option>
                  </MySelect>
                </FormGroup>
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    label="Phone Number"
                    name="phone_number"
                    type="text"
                  />
                </FormGroup>
              </div>
              <div className="form-row" >
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    name="email"
                    label="Email"
                    type="email"
                  />
                </FormGroup>
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    name="password"
                    type="password"
                    label="Password"
                  />
                </FormGroup>
                <FormGroup as={Col} md="4" >
                  <MyTextField 
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <MyTextField 
                  as="textarea"
                  label="Bio"
                  name="bio"
                />
              </FormGroup>
              <FormGroup>
                <MyCheckbox name="acceptTerms">
                   Accept the terms and conditions
                </MyCheckbox>
              </FormGroup>
              <div className="form-row" >
                <FormGroup as={Col} >
                  <Button className="btn btn-primary" type="submit" disabled={isSubmitting}  >
                    {isSubmitting && 
                      <FontAwesomeIcon icon="spinner" pulse />
                    }
                    Register
                  </Button>
                  <Link to="login" className="text-center">Cancel</Link>
                </FormGroup>
              </div>
            </div>
          </Form>
      )}
    </Formik>
  );
}

export { RegisterPage };