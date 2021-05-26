import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Lock } from '@material-ui/icons';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInUser } from './authActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '400px',
    width: '360px',
    margin: `calc((100vh - 400px)/2) calc((100vw - 360px)/2) calc((100vh - 400px)/2) calc((100vw - 360px)/2) `,
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
    '& div': {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary.main,
    },
    '& label': {},
  },
  button: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const Wrapper = React.forwardRef(({ children }, ref) => {
    return (
      <div ref={ref} tabIndex={-1} style={{ pointerEvents: 'none' }}>
        {children}
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
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            try {
              dispatch(signInUser(values));
              setSubmitting(false);
              dispatch(closeModal());
            } catch (error) {
              setErrors({ auth: 'Problem with username or password' });
              setSubmitting(false);
            }
          }}
        >
          {({ submitForm, isSubmitting }) => (
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
                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className={classes.button}
                >
                  SIGN IN
                </Button>
              </Form>
            </Paper>
          )}
        </Formik>
      </Wrapper>
    </ModalWrapper>
  );
}
