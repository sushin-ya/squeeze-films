import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Lock } from '@material-ui/icons';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '360px',
    pointerEvents: 'auto',
  },
  avatar: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    '& div': {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    '& label': {},
  },
  marginLarge: {
    marginBottom: '16px',
  },
  marginSmall: {
    marginBottom: '2px',
  },
  button: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
  },
  errors: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

export default function RegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const Wrapper = React.forwardRef(({ children }, ref) => {
    return (
      <div ref={ref} tabIndex={-1} style={{ pointerEvents: 'none' }}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.grid}
        >
          {children}
        </Grid>
      </div>
    );
  });

  return (
    <ModalWrapper>
      <Wrapper>
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.displayName) {
              errors.displayName = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await registerInFirebase(values);
              setSubmitting(false);
              dispatch(closeModal());
            } catch (error) {
              setErrors({ auth: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({ submitForm, isSubmitting, errors, touched }) => {
            return (
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <Lock />
                </Avatar>
                <Typography variant='h5' className={classes.marginBottom}>
                  Sign up
                </Typography>
                <Form className={classes.form}>
                  <Field
                    component={TextField}
                    name='displayName'
                    type='name'
                    label='DisplayName'
                    variant='outlined'
                    className={
                      touched.displayName && errors.displayName
                        ? classes.marginSmall
                        : classes.marginLarge
                    }
                  />
                  <br />
                  <Field
                    component={TextField}
                    name='email'
                    type='email'
                    label='Email'
                    variant='outlined'
                    className={
                      touched.email && errors.email
                        ? classes.marginSmall
                        : classes.marginLarge
                    }
                  />
                  <br />
                  <Field
                    component={TextField}
                    type='password'
                    label='Password'
                    name='password'
                    variant='outlined'
                    className={
                      touched.password && errors.password
                        ? classes.marginSmall
                        : classes.marginLarge
                    }
                  />
                  {isSubmitting && <LinearProgress />}
                  <br />
                  {errors.auth && (
                    <Typography color='error' className={classes.errors}>
                      {errors.auth}
                    </Typography>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    onClick={submitForm}
                    className={classes.button}
                  >
                    Register
                  </Button>
                </Form>
                <Typography variant='h6'>Or</Typography>
                <SocialLogin />
              </Paper>
            );
          }}
        </Formik>
      </Wrapper>
    </ModalWrapper>
  );
}
