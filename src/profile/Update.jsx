import React, { useState } from 'react';
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

function Update({ history }) {
  const user = accountService.userValue;

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm('Are you sure?')) {
      setIsDeleting(true);
      accountService.delete(user.id)
        .then(() => alertService.success('Account deleted successfully'));
    }
  }

  return (
    <Formik 
      initialValues={{
        title: user.title,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        home_address: user.home_address,
        country: user.country,
        phone_number: user.phone_number,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        bio: user.bio
      }} 
      validationSchema={Yup.object({
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
        bio: Yup.string()
          .max(128, 'Maximux of 128 Characters reached!'),
        password: Yup.string(),
        confirmPassword: Yup.string()
          .when('password', (password, schema) => {
            if (password) return schema.required('Confirm Password is required');
          })
          .oneOf([Yup.ref('password')], 'Passwords must match')
      })} 
      onSubmit={(fields, {setStatus, setSubmitting}) => {
        setStatus();
        accountService.update(user.id, fields)
          .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('.');
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }}>
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
              </div>
              <div>
                <h3>Change Password</h3>
                <p>Leave blank to keep ssame password</p>
              </div>
              <div className="form-row" >
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
                <Button className="btn btn-primary" type="submit" disabled={isSubmitting}  >
                  {isSubmitting && 
                    <FontAwesomeIcon icon="spinner" pulse />
                  }
                  Update Account
                </Button>
                <Link to={'.'} className="btn btn-link">Back to Profile</Link>
                <Button 
                  className="btn btn-sm btn-danger" onClick={() => onDelete()} disabled={isDeleting}
                >
                  {isDeleting
                    && <FontAwesomeIcon icon="spinner" pulse />
                  }
                  <span>Delete</span>
                </Button>
              </FormGroup>
            </div>
          </Form>
      )}
    </Formik>
  )
};

export { Update };