import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export default function ProfileList() {
  const classes = useStyles();

  return <div className={classes.container}>ProfileList</div>;
}
