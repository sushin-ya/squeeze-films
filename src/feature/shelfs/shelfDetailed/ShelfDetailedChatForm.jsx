import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';

export default function ShelfDetailedChatForm({
  shelfId,
  parentId,
  closeForm,
}) {
  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.comment) {
          errors.comment = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(shelfId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm();
        }
      }}
    >
      {({ values, isSubmitting, submitForm }) => (
        <Form>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='flex-end'
          >
            <Field
              component={TextField}
              type='text'
              label='Comment'
              placeholder='Enter your comment (Enter to submit,  SHIFT + Enter for new line)'
              name='comment'
              variant='outlined'
              fullWidth
              multiline
              rows='3'
              value={values.comment}
            />
            {isSubmitting && <LinearProgress />}
            <Box mt={1} />
            <Button
              variant='outlined'
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
