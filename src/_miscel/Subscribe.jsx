import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { InputGroup, Button } from 'react-bootstrap';
import { Alert } from '../_components';

import { subscribeService, alertService } from '../_services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyText = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <InputGroup>
      <input className={"form-control"  + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
      <InputGroup.Append>
        <Button type="submit" className="btn-primary" >
          <FontAwesomeIcon icon="thumbs-up" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
    {meta.touched && meta.error ? (
      <div className="error" >{meta.error}</div>
    ) : null}
  </>);
};

function SubscribeMe () {
  return (<Formik
    initialValues={{
      email: ''
    }}
    validationSchema={Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    })}
    onSubmit={(fields, {setSubmitting}) => {
      setTimeout(() => {
        subscribeService.subscribe(fields)
          .then(() => {
            alertService.success('You have opted to subscribe to our site. Your email is safe with us and we will not share it with anyone.', { keepAfterRouteChange: true });
          })
          .catch(error => {
            setSubmitting(false);
            alertService.error(error);
          });
      }, 400);
    }}
  >
    {
      ({isSubmitting}) => {
        return (
          <Form>
            <Alert />
            <MyText
              name="email"
              type="email"
              placeholder="Subscribe to us..."
              disabled={isSubmitting}
            />
          </Form>
        )
      }
    }
  </Formik>);
};

export { SubscribeMe };
