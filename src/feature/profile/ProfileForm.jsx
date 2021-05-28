import React from 'react';
import {
  makeStyles,
  TextField,
  LinearProgress,
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { updateUserProfile } from '../../app/firestore/firestoreService';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  form: { width: '100%' },

  button: {
    backgroundColor: '#398585',
    color: '#FFFFFF',
    width: '100%',
    '&:hover': {
      backgroundColor: '#265858',
    },
  },
}));

export default function ProfileForm({ profile }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        selfIntroduction: profile.selfIntroduction || '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.displayName) {
          errors.displayName = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Box mb={4} />
            <Field
              id='displayName'
              name='displayName'
              label='DisplayName'
              type='name'
              component={TextField}
              value={values.displayName}
              onChange={handleChange}
              variant='outlined'
              fullWidth={true}
            />
            <Box mb={2} />
            <Field
              id='selfIntroduction'
              name='selfIntroduction'
              label='SelfIntroduction'
              type='text'
              component={TextField}
              value={values.selfIntroduction}
              onChange={handleChange}
              variant='outlined'
              fullWidth={true}
              multiline
            />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant='contained'
              className={classes.button}
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
            >
              <Box p={0.5}>Submit</Box>
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
