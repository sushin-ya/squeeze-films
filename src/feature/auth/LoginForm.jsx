import React from 'react';
import { useDispatch } from 'react-redux';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { closeModal } from '../../app/common/modals/modalReducer';
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
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    '&  div': {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    '& label': {},
  },
  button: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    color: '#FFFFFF',
  },
  errors: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

export default function LoginForm() {
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
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
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
              await signInWithEmail(values);
              setSubmitting(false);
              dispatch(closeModal());
            } catch (error) {
              setErrors({ auth: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({ submitForm, isSubmitting, errors }) => (
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Lock />
              </Avatar>
              <Typography variant='h5' className={classes.marginBottom}>
                Sign in
              </Typography>
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name='email'
                  type='email'
                  label='Email'
                  variant='outlined'
                  className={classes.marginBottom}
                />
                <br />
                <Field
                  component={TextField}
                  type='password'
                  label='Password'
                  name='password'
                  variant='outlined'
                  className={classes.marginBottom}
                />
                {isSubmitting && <LinearProgress />}
                <br />
                {errors.auth && (
                  <Typography color='error' className={classes.errors}>
                    {errors.auth}
                  </Typography>
                )}
                <Box mb={1}>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    onClick={submitForm}
                    className={classes.button}
                  >
                    SIGN IN
                  </Button>
                </Box>
              </Form>
              <Typography variant='h6'>Or</Typography>
              <SocialLogin />
            </Paper>
          )}
        </Formik>
      </Wrapper>
    </ModalWrapper>
  );
}
