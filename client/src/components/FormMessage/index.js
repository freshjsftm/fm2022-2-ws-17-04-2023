import React from 'react';
import { Formik, Form, Field } from 'formik';
import { addMessage } from '../../api';

const FormMessage = () => {
  const onSubmit = (values, formikBag) => {
    addMessage(values);
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={{ content: '', user: '' }} onSubmit={onSubmit}>
      <Form>
        <Field name="content" placeholder="content" />
        <Field name="user" placeholder="user" />
        <input type="submit" value="send new message" />
      </Form>
    </Formik>
  );
};

export default FormMessage;
