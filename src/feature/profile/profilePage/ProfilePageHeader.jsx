import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowUser, setUnfollowUser } from '../profileAction';
import {
  followUser,
  getFollowingDoc,
  unfollowUser,
} from '../../../app/firestore/firestoreService';
import { toast } from 'react-toastify';
import { CLEAR_FOLLOWINGS } from '../profileConstents';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(0),
    alignItems: 'center',
  },
  displayName: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
  avatar: {
    height: '100px',
    width: '100px',
  },
  follow: {
    color: '#FFFFFF',
    width: '100%',
  },
  unfollow: {
    backgroundColor: '#F44336',
    '&:hover': {
      backgroundColor: '#C6382E',
    },
    color: '#FFFFFF',
    width: '100%',
  },
}));

export default function ProfilePageHeader({ profile, isCurrentUser }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        } else {
          dispatch(setUnfollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));
    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS });
    };
  }, [dispatch, profile.id, isCurrentUser]);

  async function handleFollowUesr() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnFollowUesr() {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper>
      <Box p={2}>
        <div className={classes.container}>
          <Avatar
            alt='avatar'
            src={profile.photoURL}
            className={classes.avatar}
          />
          <Typography
            variant='h3'
            style={{ gridColumnStart: 2, gridColumnEnd: 9 }}
            className={classes.displayName}
            color='textSecondary'
          >
            {profile.displayName}
          </Typography>
          <Box style={{ gridColumnStart: 9, gridColumnEnd: 13 }}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Grid item>
                <Box mr={2}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='center'
                  >
                    <Typography variant='h3' color='textSecondary'>
                      {profile.followerCount || 0}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      Followers
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <Typography variant='h3' color='textSecondary'>
                    {profile.followingCount || 0}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Followings
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {!isCurrentUser && (
              <>
                <Box mb={1} />
                {followingUser ? (
                  <Button
                    variant='contained'
                    className={classes.unfollow}
                    color='primary'
                    onClick={handleUnFollowUesr}
                  >
                    <Box p={0.5}>UnFollow</Box>
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    className={classes.follow}
                    color='primary'
                    onClick={handleFollowUesr}
                  >
                    <Box p={0.5}>Follow</Box>
                  </Button>
                )}
              </>
            )}
          </Box>
        </div>
      </Box>
    </Paper>
  );
}
