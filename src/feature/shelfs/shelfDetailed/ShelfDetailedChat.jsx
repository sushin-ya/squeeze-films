import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ShelfDetailedChatForm from './ShelfDetailedChatForm';
import { formatDistance } from 'date-fns';

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
  const { authenticated } = useSelector((state) => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }
  const sampleChat = [
    {
      childNodes: [],
      date: 1622358938365,
      displayName: 'Taiana',
      id: '-Maw7CAsndeoR72_Dx9N',
      parentId: 0,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/reventscourse-4cb6b.appspot.com/o/P3iCjGTF2fXZ7GVE0AKtUjzFWC83%2Fuser_images%2Fcklptb2zw00013g65hnflj36y.jpeg?alt=media&token=5a2c827b-69b2-4f5b-926f-498d319ae665',
      text: 'orem Ipsum is simply dummy te PageMaker\n te PageMaker te PageMaker te PageMaker  including veMaker including ve',
      uid: 'P3iCjGTF2fXZ7GVE0AKtUjzFWC83',
    },
    {
      childNodes: [
        {
          date: 1622356779083,
          displayName: 'Taiana',
          id: '-davzwfLa5b2tRdgdEdV',
          parentId: '-MavzwfLa5b2tRRgdE7V',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/reventscourse-4cb6b.appspot.com/o/P3iCjGTF2fXZ7GVE0AKtUjzFWC83%2Fuser_images%2Fcklptb2zw00013g65hnflj36y.jpeg?alt=media&token=5a2c827b-69b2-4f5b-926f-498d319ae665',
          text: 'tets',
          uid: 'P3iCjGTF2fXZ7GVE0AKtUjzFWC83',
        },
      ],
      date: 1622356773685,
      displayName: 'Taiana',
      id: '-davzwfLa5b2tRdgdE7V',
      parentId: 0,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/reventscourse-4cb6b.appspot.com/o/P3iCjGTF2fXZ7GVE0AKtUjzFWC83%2Fuser_images%2Fcklptb2zw00013g65hnflj36y.jpeg?alt=media&token=5a2c827b-69b2-4f5b-926f-498d319ae665',
      text: 'tets',
      uid: 'P3iCjGTF2fXZ7GVE0AKtUjzFWC83',
    },
  ];

  return (
    <div style={{ gridColumnEnd: 'span 8' }}>
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
          {sampleChat.map((comment) => (
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
          ))}
        </Paper>
      )}
      <Box mb={20} />
    </div>
  );
}
