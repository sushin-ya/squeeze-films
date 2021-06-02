import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 120,
  },
  name: {
    textAlign: 'center',
  },
}));

export default function ProfileCard({ profile, setValue }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          setValue(0);
          history.push(`/profile/${profile.uid}`);
        }}
      >
        <CardMedia
          component='img'
          alt=''
          image={profile.photoURL || '/assets/user.png'}
          title='userimage'
        />
        <CardContent>
          <Typography variant='h6' className={classes.name}>
            {profile.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
