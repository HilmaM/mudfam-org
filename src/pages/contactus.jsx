import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { contactusService, alertService } from '../_services';
import { Alert } from '../_components';

function ContactusSection({ history }) {
  const initialValues = {
    names: '',
    email: '',
    message: ''
  };

  const validationSchema = Yup.object().shape({
    names: Yup.string()
      .required('Names of the Sender are required!'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    message: Yup.string()
      .min(10, 'A minmum of 10 characters required')
      .max(3000, "Message should not be longer than this!")
      .required("What's your message!")
  });

  function onSubmit(fields, { setSubmitting }) {
      alertService.clear();
      contactusService.sendmessage(fields)
        .then(() => {
          alertService.success('Your message was sent to the Admins.', { keepAfterRouteChange: true });
          const { from } = location.state || { from: { pathname: "/home/contactus" } };
          history.push(from);
        })
        .catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
  }
    
  return (<>
    <section className="about-info py-5 px-lg-5">
      <div className="content-w3ls-inn px-lg-5">
        <div className="container py-md-5 py-3">
          <div className="px-lg-5">
            <h3 className="tittle-w3ls mb-lg-5 mb-4">Contact<span className="pink"> Us</span></h3>
            <div className="row" >
              <div className="col-6 p-md-5" >
                <h5>Head Office</h5>
                <p className="mt-5 pr-lg-5">
                  Stand 291, Binga, Zimbabwe <br/>
                  +263 15 356 or 366 <br/>
                  bast-binga@basilwizi.org
                </p>
              </div>
              <div className="col-6 p-md-5" >
              </div>
            </div>
            <div className="contact-hny-form mt-lg-5 mt-3">
              <h3 className="title-hny mb-lg-5 mb-3">Leave a Message</h3>
              <small>Please provide your names and a working Email address so that we respond to your message</small>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="row p-md-3" >
                      <div className="col-lg-6">
                        <Alert />
                        <div className="form-group">
                          <label htmlFor="">Your Name</label>
                          <Field name="names" type="text" className={'form-control' + (errors.names && touched.names ? ' is-invalid' : '')} />
                          <ErrorMessage name="names" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="">Message</label>
                          <Field as='textarea' name="message" type="text" className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')} />
                          <ErrorMessage name="message" component="div" className="invalid-feedback" />
                        </div>
                      </div> 
                      <div className="form-group mx-auto mt-3">
                        <button className="btn btn-default morebtn more black con-submit" type="submit" disabled={isSubmitting} >
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          Send
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="map-w3pvt mt-5">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2321729.2724760063!2d27.078654273917344!3d-17.11408350914022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1948af4636889ddd%3A0x2be5605f1d31eead!2sBinga%2C%20Zimbabwe!5e0!3m2!1sen!2sus!4v1600507986923!5m2!1sen!2sus" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

export { ContactusSection };
