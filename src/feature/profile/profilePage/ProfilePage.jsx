import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import SideSimilarProfiles from '../../side/SideSimilarProfiles';
import ProfilePageMain from './ProfilePageContent';
import ProfilePageTop from './ProfilePageHeader';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ProfilePageTop
          displayName={currentUser.displayName}
          photoURL={currentUser.photoURL}
        />
        <ProfilePageMain />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SideSimilarProfiles />
      </div>
    </div>
  );
}
