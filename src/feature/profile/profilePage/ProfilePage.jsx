import React from 'react';
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import useFirestoreHook from '../../../app/hooks/useFirestoreDoc';
import { listenToSelectedUserProfile } from '../profileAction';
import SidePopularFilms from '../../side/SidePopularFilms';
import ProfilePageContent from './ProfilePageContent';
import ProfilePageHeader from './ProfilePageHeader';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
    height: '100vh',
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const params = useParams();
  const { currentUserProfile, selectedUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  useFirestoreHook({
    query: () => getUserProfile(params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, params.id],
    shouldExecute: params.id !== currentUser.uid,
  });

  if (params.id !== currentUser.uid) {
    profile = selectedUserProfile;
  } else {
    profile = currentUserProfile;
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content='Loading profile...' />;

  return (
    <div className={classes.container}>
      <div
        style={
          !matches ? { gridColumnEnd: 'span 8' } : { gridColumnEnd: 'span 13' }
        }
      >
        <ProfilePageHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <Box mb={2} />
        <ProfilePageContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </div>
      {!matches ? (
        <div style={{ gridColumnEnd: 'span 4' }}>
          <SidePopularFilms />
        </div>
      ) : null}
    </div>
  );
}
