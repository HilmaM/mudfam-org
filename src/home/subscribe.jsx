import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 
import { subscribeService, alertService } from '@/_services';
import { Alert } from '../_components';

function SubscribeSection({history}) {

  /**
   * Saving the email
   */
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });

  function onSubmit(email, { setSubmitting }) {
    alertService.clear();
    subscribeService.saveEmail(email)
      .then(() => {
        alertService.success('You have successfully subscribed to our Emailing List.', { keepAfterRouteChange: true });
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <section>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6 m-md-auto ml-lg-0 col-lg-5"><img className="img-fluid" src="src/tools/svg/group-chat.svg" alt="Subscribe" /></div>
          <div className="col-12 col-md-10 col-lg-6 mt-4 mt-lg-0 ml-auto mr-auto ml-lg-auto text-left">
          <div className="row">
            <div className="col">
              <h1>Subscribe</h1>
              <p className="lead">Subscribe to Basilwizi Trust to receive latest news, updates and social events taking place.</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <Alert />
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                {({errors, touched, isSubmitting}) => (
                <Form>
                  <div className="input-group mb-3" >
                    <Field 
                      type="email"
                      name="email"
                      placeholder="Your email..."
                      className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    <div className="input-group-append" >
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary" >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
              </Formik>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>*Your email address is safe with us</h4>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
    
}

export { SubscribeSection };
