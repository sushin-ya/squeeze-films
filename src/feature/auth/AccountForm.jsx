import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { updateUserPassword } from '../../app/firestore/firebaseService';
import { closeModal } from '../../app/common/modals/modalReducer';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  topWapper: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '360px',
    pointerEvents: 'auto',
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
    margin: theme.spacing(0, 2),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
  },
  errors: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  facebook: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
    margin: theme.spacing(1, 1, 1, 1),
    backgroundColor: '#3B5998',
    '&:hover': {
      backgroundColor: '#21355D',
    },
  },
  google: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    color: '#FFFFFF',
    margin: theme.spacing(1, 1, 2, 1),
    backgroundColor: '#DD4B39',
    '&:hover': {
      backgroundColor: '#812B20',
    },
  },
}));

export default function AccountForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

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
        {currentUser.providerId === 'password' && (
          <>
            <Formik
              initialValues={{
                newPassword1: '',
                newPassword2: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.newPassword1) {
                  errors.newPassword1 = 'Required';
                } else if (!values.newPassword2) {
                  errors.newPassword2 = 'Required';
                } else if (currentUser.password === values.newPassword1) {
                  errors.newPassword1 = 'Password has not been changed';
                } else if (values.newPassword1 !== values.newPassword2) {
                  errors.newPassword2 = 'Password do not match';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  await updateUserPassword(values);
                  dispatch(closeModal());
                } catch (error) {
                  setErrors({ auth: error.message });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ submitForm, isSubmitting, errors }) => (
                <Paper className={classes.paper}>
                  <Box ml={2} mt={2} className={classes.topWapper}>
                    <Grid
                      container
                      direction='column'
                      justify='flex-start'
                      alignItems='flex-start'
                    >
                      <Typography variant='h5'>Account</Typography>
                      <Box mb={1} />
                      <Typography variant='body1' color='secondary'>
                        Change Password
                      </Typography>
                      <Typography variant='body1' color='textPrimary'>
                        Use this from to change your password
                      </Typography>
                    </Grid>
                  </Box>
                  <Form className={classes.form}>
                    <Field
                      component={TextField}
                      type='password'
                      label='New Password'
                      name='newPassword1'
                      variant='outlined'
                    />
                    <Box mb={1} />
                    <Field
                      component={TextField}
                      type='password'
                      label='Confirm Password'
                      name='newPassword2'
                      variant='outlined'
                    />
                    <Box mb={2} />
                    {isSubmitting && <LinearProgress />}
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
                      SIGN IN
                    </Button>
                    <Box mb={2} />
                  </Form>
                </Paper>
              )}
            </Formik>
          </>
        )}
        {currentUser.providerId === 'facebook.com' && (
          <>
            <Paper className={classes.paper}>
              <Box ml={2} mt={2} className={classes.topWapper}>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='flex-start'
                >
                  <Typography variant='h5'>Account</Typography>
                  <Box mb={1} />
                  <Typography variant='body1' color='secondary'>
                    Change Password
                  </Typography>
                  <Typography>
                    Please visit Facebook to update your account
                  </Typography>
                </Grid>
              </Box>
              <Box mb={1} />
              <Button
                variant='contained'
                className={`${classes.button} ${classes.facebook}`}
                href='https://facebook.com'
              >
                Go to Facebook
              </Button>
              <Box mb={2} />
            </Paper>
          </>
        )}
        {currentUser.providerId === 'google.com' && (
          <>
            <Paper className={classes.paper}>
              <Box ml={2} mt={2} className={classes.topWapper}>
                <Grid
                  container
                  direction='column'
                  justify='flex-start'
                  alignItems='flex-start'
                >
                  <Typography variant='h5'>Account</Typography>
                  <Box mb={1} />
                  <Typography variant='body1' color='secondary'>
                    Change Password
                  </Typography>
                  <Typography>
                    Please visit Google to update your account
                  </Typography>
                </Grid>
              </Box>
              <Box mb={1} />
              <Button
                variant='contained'
                className={`${classes.button} ${classes.google}`}
                href='https://google.com'
              >
                Go to Google
              </Button>
              <Box mb={2} />
            </Paper>
          </>
        )}
      </Wrapper>
    </ModalWrapper>
  );
}
