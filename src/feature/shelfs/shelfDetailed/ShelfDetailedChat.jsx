import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ShelfDetailedChatForm from './ShelfDetailedChatForm';
import { formatDistance } from 'date-fns';
import { getShelfChatRef } from '../../../app/firestore/firebaseService';
import { listenToShelfChat } from '../shelfActions';
import { CLEAR_COMMENT } from '../shelfConstants';
import { firebaseObjectToArray } from '../../../app/firestore/firebaseService';
import { createDataTree } from '../../../app/common/utility';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  avatar: {
    height: '50px',
    width: '50px',
  },
  date: {
    fontSize: '12px',
  },
  fullwidth: {
    width: '100%',
  },
}));

export default function ShelfDetailedChat({ shelfId }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.shelf);
  const { authenticated } = useSelector((state) => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getShelfChatRef(shelfId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToShelfChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENT });
      getShelfChatRef().off();
    };
  }, [shelfId, dispatch]);

  return (
    <div
      style={
        !matches ? { gridColumnEnd: 'span 8' } : { gridColumnEnd: 'span 13' }
      }
    >
      <Paper>
        <Typography variant='h5' className={classes.title}>
          {authenticated ? 'Chat about this shelf' : 'Sign in to view comment'}
        </Typography>
      </Paper>
      {authenticated && (
        <Paper>
          <Box p={2}>
            <ShelfDetailedChatForm
              shelfId={shelfId}
              parentId={0}
              closeForm={handleCloseReplyForm}
            />
          </Box>
          {createDataTree(comments).map((comment) => {
            return (
              <Box p={2} key={comment.id}>
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='flex-start'
                  wrap='nowrap'
                >
                  <Avatar
                    alt='avatar'
                    src={comment.photoURL || '/assets/user.png'}
                    className={classes.avatar}
                  />
                  <Box ml={1} mr={2} className={classes.fullwidth}>
                    <Grid
                      container
                      item
                      direction='column'
                      justify='flex-start'
                      alignItems='flex-start'
                    >
                      <Grid
                        container
                        item
                        direction='row'
                        justify='flex-start'
                        alignItems='center'
                      >
                        <Typography variant='subtitle1'>
                          {comment.displayName}
                        </Typography>
                        <Box ml={1}>
                          <Typography
                            variant='body1'
                            color='secondary'
                            className={classes.date}
                          >
                            {formatDistance(comment.date, new Date())}
                          </Typography>
                        </Box>
                        <Button
                          size='small'
                          variant='text'
                          onClick={() =>
                            setShowReplyForm({
                              open: true,
                              commentId: comment.id,
                            })
                          }
                        >
                          reply
                        </Button>
                      </Grid>
                      <Typography variant='body1'>
                        {comment.text.split('\n').map((text, i) => (
                          <span key={i}>
                            {text}
                            <br />
                          </span>
                        ))}
                      </Typography>
                      {showReplyForm.open &&
                        showReplyForm.commentId === comment.id && (
                          <Box p={1} className={classes.fullwidth}>
                            <ShelfDetailedChatForm
                              shelfId={shelfId}
                              parentId={comment.id}
                              closeForm={handleCloseReplyForm}
                            />
                          </Box>
                        )}
                    </Grid>
                  </Box>
                </Grid>
                {comment.childNodes.length > 0 && (
                  <Grid>
                    {comment.childNodes.reverse().map((child) => (
                      <Box p={3} key={child.id}>
                        <Grid
                          container
                          direction='row'
                          justify='flex-start'
                          alignItems='flex-start'
                          wrap='nowrap'
                        >
                          <Avatar
                            alt='avatar'
                            src={child.photoURL || '/assets/user.png'}
                            className={classes.avatar}
                          />
                          <Box ml={1} mr={2} className={classes.fullwidth}>
                            <Grid
                              container
                              item
                              direction='column'
                              justify='flex-start'
                              alignItems='flex-start'
                            >
                              <Grid
                                container
                                item
                                direction='row'
                                justify='flex-start'
                                alignItems='center'
                              >
                                <Typography variant='subtitle1'>
                                  {child.displayName}
                                </Typography>
                                <Box ml={1}>
                                  <Typography
                                    variant='body1'
                                    color='secondary'
                                    className={classes.date}
                                  >
                                    {formatDistance(child.date, new Date())}
                                  </Typography>
                                </Box>
                                <Button
                                  size='small'
                                  variant='text'
                                  onClick={() =>
                                    setShowReplyForm({
                                      open: true,
                                      childId: child.id,
                                    })
                                  }
                                >
                                  reply
                                </Button>
                              </Grid>
                              <Typography variant='body1'>
                                {child.text.split('\n').map((text, i) => (
                                  <span key={i}>
                                    {text}
                                    <br />
                                  </span>
                                ))}
                              </Typography>
                              {showReplyForm.open &&
                                showReplyForm.childId === child.id && (
                                  <Box p={1} className={classes.fullwidth}>
                                    <ShelfDetailedChatForm
                                      shelfId={shelfId}
                                      parentId={child.id}
                                      closeForm={handleCloseReplyForm}
                                    />
                                  </Box>
                                )}
                            </Grid>
                          </Box>
                        </Grid>
                      </Box>
                    ))}
                  </Grid>
                )}
              </Box>
            );
          })}
        </Paper>
      )}
      <Box mb={20} />
    </div>
  );
}
