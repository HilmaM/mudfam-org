import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import FroalaEditor from 'react-froala-wysiwyg';
// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import { poemService, alertService } from '../_services';
import { Row, FormGroup, Col, Button } from 'react-bootstrap';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="text-input" {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
    ) : null}
  </>);
};

const MyEditor = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [data, setData] = useState(null);
  const mngData = (data) => {
    setData(data);
  };
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <FroalaEditor 
      tag="textarea"
      model={data}
      onModelChange={mngData}
      {...field}
      {...props}
    />
    {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
    ) : null}
  </>);
}

function CreatePoem () {
  return (
    <Formik
      initialValues={{
        poet_name: '',
        poem_title: '',
        poem_category: '',
        poem_content: ''
      }}
      validationSchema={Yup.object({
        poet_name: Yup.string()
          .required('Poet Name is required'),
        poem_title: Yup.string()
          .required('Poem Title is required'),
        poem_category: Yup.string()
          .oneOf([
            'Personal', 'Tonga', 'Zimbabwe', 'Africa', 'Weather', 'Finance', 'Romance', 'Music', 'Education', 'Culture', 'Travel', 'Technology'
          ])
          .required('Category is required'),
        poem_content: Yup.string()
          .max(4500, 'Do not exceed 4500 Characters ... ')
          .required('Poem Content is required.')
      })}
      onSubmit={(fields, {setStatus, setSubmitting}) => {
        setTimeout(() => {
          setStatus();
          poemService.create(fields)
            .then(() => {
              alertService.success('Poem uploaded successful', { keepAfterRouteChange: true });
            })
            .catch(error => {
              setSubmitting(false);
              alertService.error(error);
            });
        }, 400)
      }}
    >
      {
        ({isSubmitting, setFieldValue}) => {
          const [poem, setPoem] = useState({});

          return (<Form>
            <div className="jumbotron p-2 p-md-5 rounded">
              <h1 className="" >Write New Item</h1>
              <Row>
                <FormGroup as={Col} md={9} >
                  <MyTextInput 
                    label="Poet Name(s)"
                    name="poet_name"
                    type="text"
                    placeholder="Poeter Songlino Nicolo"
                  />
                </FormGroup>
                <FormGroup as={Col} md={3} >
                  <MyTextInput 
                    label="Poem Category"
                    name="poem_category"
                    type="text"
                    placeholder="World / Politics"
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <MyTextInput 
                    label="Title of the Item"
                    name="poem_title"
                    type="text"
                  />
                </FormGroup>
              </Row>
              <Row>
                <MyEditor
                  label="Contents"
                  name="poem_content"
                  type="text"
                />
              </Row>
              <Row>
                <FormGroup className="text-center">
                  <Button
                    type="submit"
                    className="btn btn-md btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    Create Article
                  </Button>
                </FormGroup>
              </Row>
            </div>
          </Form>)
        }
      }
    </Formik>
  )
}

export { CreatePoem };

