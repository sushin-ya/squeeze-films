import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SideSimilarProfiles from '../../side/SideSimilarProfiles';
import ProfilePageContent from './ProfilePageContent';
import ProfilePageHeader from './ProfilePageHeader';
import { useParams } from 'react-router-dom';
import useFirestoreHook from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToCurrentUserProfile } from '../profileAction';

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
  const dispatch = useDispatch();
  const params = useParams();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  useFirestoreHook({
    query: () => getUserProfile(params.id),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, params.id],
    // shouldExecute: params.id !== currentUser.uid,
  });

  // if (params.id === currentUser.uid) {
  profile = currentUserProfile;
  // } else {
  //   profile = selectedUserProfile;
  // }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content='Loading profile...' />;

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ProfilePageHeader
          displayName={profile[0].displayName}
          photoURL={profile[0].photoURL}
        />
        <Box mb={2} />
        <ProfilePageContent
          displayName={profile[0].displayName}
          selfIntroduction={
            profile[0].selfIntroduction || 'no selfIntroduciton'
          }
          createdAt={profile[0].createdAt.toDateString()}
        />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SideSimilarProfiles />
      </div>
    </div>
  );
}
