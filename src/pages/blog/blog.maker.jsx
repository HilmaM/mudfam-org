import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { Col, FormGroup, Row } from 'react-bootstrap';

import { blogpostService, alertService } from '../../_services';
import { Alert } from '../../_components';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className="form-control" {...field} {...props} />
    {meta.touched && meta.error ? (
      <StyledErrorMessage>{meta.error}</StyledErrorMessage>
    ) : null}
  </>);
};

// Styled components ....
const StyledSelect = styled.select`
  color: blue;
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`;

const StyledLabel = styled.label`
  font-size: 32px;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

function BlogMaker ({id, history, doc, edit, documentStore, onSave }) {
  const isAddMode = !id;

  const [blog_title, setContentTitle] = useState(null);
  const [blog_message, setContentMessage] = useState(null);
  const [dirty, setDirty] = useState(false);

  return (<>
    <Formik  
      initialValues={{
        title: '', 
        firstName: '', 
        lastName: ''
      }} 
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Title is required'),
        firstName: Yup.string()
          .required('First Name is required'),
        lastName: Yup.string()
          .required('Last Name is required')
      })} 
      onSubmit={(fields, { setStatus, setSubmitting }) => {

        const data = { ...fields, blog_title: blog_title, blog_message: blog_message }

        if(data.blog_title === "" && data.blog_message === "") {
          return;
        }
        
        setStatus();
        if (isAddMode) {
          blogpostService.makepost(data)
            .then(() => {
              alertService.success('Blog post created', {keepAfterRouteChange: true});
            })
            .catch(error => {
              setSubmitting(false);
              alertService.error(error);
            })
        } else {
          blogpostService.update(data)
            .then(() => {
              alertService.success('You have updated this blog', { keepAfterRouteChange: true });
            })
            .catch(error => {
              setSubmitting(false);
              alertService.error(error);
            })
        }
      }} >
        {
          ({ isSubmitting, setFieldValue }) =>  {
            useEffect(() => {
              if (!isAddMode) {
                const fields = ['title', 'firstName', 'lastName', 'blog_title', 'blog_message'];
                blogpostService.getById(id).then(blog => {
                  fields.forEach(field => setFieldValue(field, blog[field], false));
                });
              }
            }, []);
            return (<Form>
              <h1>{isAddMode ? 'Add Blog' : 'Edit Blog'}</h1>
              <div>
                <Row>
                  <Alert />
                  <FormGroup as={Col} >
                    <MySelect
                      name="title"
                      label="Title"
                    >
                      <option value="" disabled={true} >Select...</option>
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
                      name="firstName"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup as={Col} md={5} >
                    <MyTextField 
                      label="Surname"
                      name="lastName"
                      type="text"
                    />
                  </FormGroup>
                </Row>
                <FormGroup>
                  <div id="editor" >
                    <CKEditor
                      editor={InlineEditor}
                      data={blog_title || ""}
                      onInit={editor => {
                        if (edit) {
                          setContentTitle(doc.document);
                        }
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContentTitle(data);
                        setDirty(true);
                      }}
                    />
                    <div className="blog_title-invalid-feedback">
                      {dirty && !blog_title ? "Content is required" : null}
                    </div>
                  </div>
                </FormGroup>
                <FormGroup md={12} >
                  <div id="editor" >
                    <CKEditor
                      editor={InlineEditor}
                      data={blog_message || ""}
                      onInit={editor => {
                        if (edit) {
                          setContentMessage(doc.document);
                        }
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContentMessage(data);
                        setDirty(true);
                      }}
                    />
                  </div>
                </FormGroup>
                <div className="form-group">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                  </button>
                  {!isAddMode ? <Link to={'..'} className="btn btn-link">Cancel</Link> : ''}
                </div>
              </div>
            </Form>)
        }}
    </Formik>
  </>);
}

export { BlogMaker };