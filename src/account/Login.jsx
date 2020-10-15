import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Login({ history, location }) {
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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">Login</h3>
            <div className="card-body">
              <div className="row" >
                <div className="col-md-6 p-md-2" >
                  <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Twaabane Times"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Basilwizi Trust Login</text></svg>
                </div>
                <div className="col-md-6 p-md-2" >
                  <div className="form-group">
                    <label>Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                      </button>
                    </div>
                    <div className="form-group col" >
                      <Link to="register" className="btn btn-link text-right">Register</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer" >
              <div className="form-group col text-right">
                <Link to="forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
              </div>
            </div>
          </Form>
        )}
    </Formik>
  )
}

export { Login }; 