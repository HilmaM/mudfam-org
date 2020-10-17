import React, { useState, useEffect } from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { FormGroup, Button, Col } from 'react-bootstrap';
import { poemService, alertService } from '../../_services';
import { Alert } from '../../_components';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input {...field} {...props} />
    {meta.touched && meta.error ? (
      <StyledErrorMessage>{meta.error}</StyledErrorMessage>
    ) : null}
  </>);
};

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`;

const StyledLabel = styled.label`
  color: blue;
`

const StyledSelect = styled.select`
  color: black
`

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

function PoemWriter ({ documentStore, edit, onSave, doc, id, history }) {
  const isAddMode = !id;
  const [poem_content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);
  return (
    <section className="container" >
      <Formik  
        initialValues={{
          poet_name: '', 
          poem_title: '', 
          category: '',
        }} 
        validationSchema={Yup.object({
          poet_name: Yup.string()
            .required('Names of the Author are required'),
          poem_title: Yup.string()
            .min(3, 'At least 3 characters minimum')
            .max(256, 'Title should not exceed 256 Characters!')
            .required('What is the title of your poem?'),
          category: Yup.string()
            .required('category is required!')
        })} 
        onSubmit={(fields, { setStatus, setSubmitting }) => {
          const data = { ...fields, poem_content: poem_content }
  
          if(data.poem_content === "") {
            return;
          }
          
          setStatus();
          if (isAddMode) {
            poemService.upload(data)
              .then(() => {
                alertService.success('Poem Created', {keepAfterRouteChange: true});
                history.push('.');
              })
              .catch(error => {
                setSubmitting(false);
                alertService.error(error);
              })
          } else {
            poemService.update(data)
              .then(() => {
                alertService.success('You have updated this poem', { keepAfterRouteChange: true });
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
                const fields = ['poet_name', 'poem_title', 'category'];
                poemService.getById(id).then(item => {
                  fields.forEach(field => setFieldValue(field, item[field], false));
                });
              }
            }, []);
            return (<Form>
              <h1>{isAddMode ? 'Write your poem' : 'Editing an poem'}</h1>
              <div >
                <Alert />
                <FormGroup as={Col} md={3}>
                  <MySelect label="Poem Category" name="category">
                    <option value="">Select poem category</option>
                    <option value="africa">Africa</option>
                    <option value="personal">Personal</option>
                    <option value="World">World</option>
                    <option value="other">Other</option>
                  </MySelect>
                </FormGroup>
                <FormGroup as={Col} md>
                  <MyTextField 
                    label="Names of the Author"
                    name="poet_name"
                    placeholder="Malambi Syakayuni"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <MyTextField 
                    label="Title of the poem"
                    name="poem_title"
                    placeholder="This is Basilwizi Organisation"
                    type="text"
                  />
                </FormGroup>
                <FormGroup id="editor">
                    <CKEditor
                      editor={InlineEditor}
                      data={poem_content || ""}
                      onInit={editor => {
                        if (edit) {
                          setContent(doc.document);
                        }
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                        setDirty(true);
                      }}
                    />
                    <div className="poem_content-invalid-feedback">
                      {dirty && !poem_content ? "Content is required" : null}
                    </div>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                  </Button>
                </FormGroup>
              </div>
            </Form>)
        }}
      </Formik>
    </section>
  );
}
export { PoemWriter };
