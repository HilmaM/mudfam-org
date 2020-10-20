import React, { useState, useEffect } from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormGroup, Button, Col, Row } from 'react-bootstrap';
import { poemService, alertService } from '../../_services';
import { Alert } from '../../_components';

const MyTextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={props.id || props.name}>{label}</label>
    <input className={'form-control' + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
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
        <input type="checkbox" className={'form-control' + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
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
      <StyledSelect className={'form-control' + (meta.touched && meta.error ? ' is-invalid' : '')} {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

function PoemWriter ({ match, history, doc, onSave, poem }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [poem_content, setContent] = useState("");
  const [poem_title, setTitle] = useState("");
  const [dirty, setDirty] = useState(false);
  const APIURL = poemService.imgUrl();

  useEffect(() => {
    poemService.getById(id).then(x => {
      poem(x);
    });
  }, []);

  return (
    <section className="container px-md-3" >
      <Formik  
        initialValues={{
          poet_name: '', 
          category: '',
        }}
        validationSchema={Yup.object({
          poet_name: Yup.string()
            .required('Names of the Author are required'),
          category: Yup.string()
            .required('category is required!')
        })} 
        onSubmit={(fields, { setStatus, setSubmitting }) => {
          const data = { ...fields, poem_content: poem_content, poem_title: poem_title }
  
          if(data.poem_content === "" && data.poem_title === "") {
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
                return alertService.error(error);
              })
          } else {
            poemService.update(data, id)
              .then(() => {
                alertService.success('You have updated this poem', { keepAfterRouteChange: true });
              })
              .catch(error => {
                setSubmitting(false);
                return alertService.error(error);
              })
          }
        }} >
        {
          ({ isSubmitting, setFieldValue }) =>  {
            useEffect(() => {
              if (!isAddMode) {
                const fields = ['poet_name', 'category'];
                poemService.getById(id).then(item => {
                  fields.forEach(field => setFieldValue(field, item[field], false));
                  poem = {
                    poem_content: item.poem_content,
                    poem_title: item.poem_title
                  }
                });
              }
            }, []);
            return (<Form>
              <h1>{isAddMode ? 'Write your poem' : <span><em>Editing:</em></span> }</h1>
              <Row>
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
                <FormGroup as={Col} md={9}>
                  <MyTextField 
                    label="Names of the Author"
                    name="poet_name"
                    placeholder="Malambi Syakayuni"
                    type="text"
                  />
                </FormGroup>
              </Row>
              <FormGroup id="editor">
                <label htmlFor="">Title</label>
                <div className="card shadow" >
                <CKEditor
                  editor={InlineEditor}
                  data={poem_title || ""}
                  placeholder="Title of the poem ..."
                  onInit={editor => {
                    if (!isAddMode) {
                      setTitle(poem.poem_title);
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTitle(data);
                    setDirty(true);
                  }}
                />
                </div>
                <div className="poem_title-invalid-feedback">
                  {dirty && !poem_title ? "Content is required" : null}
                </div>
              </FormGroup>
              <FormGroup id="editor">
                <label htmlFor="">Contents</label>
                <div className="card shadow">
                <CKEditor
                  editor={InlineEditor}
                  data={poem_content || ""}
                  onInit={editor => {
                    if (!isAddMode) {
                      setContent(poem.poem_content);
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    setDirty(true);
                  }}
                />
                </div>
                <div className="poem_content-invalid-feedback">
                  {dirty && !poem_content ? "Content is required" : null}
                </div>
              </FormGroup>
              <FormGroup>
                  <Button type="submit" disabled={isSubmitting} className="btn btn-success">
                    {isSubmitting && <FontAwesomeIcon icon="spinner" pulse />}
                    Save
                  </Button>
              </FormGroup>
            </Form>)
        }}
      </Formik>
    </section>
  );
}

export { PoemWriter };
