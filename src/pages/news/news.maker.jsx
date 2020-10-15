import React, { useState, useEffect } from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { FormGroup, Button } from 'react-bootstrap';

import { newsService, alertService } from '../../_services';
import { Alert } from '../../_components';
import { SmallHomeSlider } from '../../home/small-home-slider';

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

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 10px;
`;

function NewsWriter ({ documentStore, edit, onSave, doc, id, history }) {
  const isAddMode = !id;
  const [article_content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);

  return (
    <section className="container" >
      <Formik  
        initialValues={{
          author: '', 
          article_title: ''
        }} 
        validationSchema={Yup.object({
          author: Yup.string()
            .required('Names of the Author are required'),
          article_title: Yup.string()
            .min(3, 'At least 3 characters minimum')
            .max(256, 'Title should not exceed 256 Characters!')
            .required('What is the title of your news?')
        })} 
        onSubmit={(fields, { setStatus, setSubmitting }) => {

          const data = { ...fields, article_content: article_content }
  
          if(data.article_content === "") {
            return;
          }
          
          setStatus();
          if (isAddMode) {
            newsService.saveNews(data)
              .then(() => {
                alertService.success('News Article Created', {keepAfterRouteChange: true});
                history.push('.');
              })
              .catch(error => {
                setSubmitting(false);
                alertService.error(error);
              })
          } else {
            newsService.update(data)
              .then(() => {
                alertService.success('You have updated this article', { keepAfterRouteChange: true });
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
                const fields = ['author', 'article_title'];
                newsService.getById(id).then(item => {
                  fields.forEach(field => setFieldValue(field, item[field], false));
                });
              }
            }, []);
            return (<Form>
              <h1>{isAddMode ? 'Write your article' : 'Editing an article'}</h1>
              <div >
                <FormGroup>
                  <MyTextField 
                    label="Names of the Author"
                    name="author"
                    placeholder="Malambi Syakayuni"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <MyTextField 
                    label="Title of the Article"
                    name="article_title"
                    placeholder="This is Basilwizi Organisation"
                    type="text"
                  />
                </FormGroup>
                <FormGroup id="editor">
                    <CKEditor
                      editor={InlineEditor}
                      data={article_content || ""}
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
                    <div className="article_content-invalid-feedback">
                      {dirty && !article_content ? "Content is required" : null}
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

export { NewsWriter };