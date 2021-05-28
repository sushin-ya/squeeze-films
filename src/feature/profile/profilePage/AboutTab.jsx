import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ProfileForm from '../ProfileForm';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(0),
    alignItems: 'center',
  },
  person: {
    height: '50px',
    width: '50px',
    fill: theme.palette.text.secondary,
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
  textBox: {
    minHeight: '200px',
  },
}));

export default function AboutTab({ value, index, profile }) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={2}>
          <div className={classes.container}>
            <PersonIcon
              style={{ gridColumnStart: 1 }}
              className={classes.person}
            />
            <Typography
              variant='h5'
              style={{ gridColumnStart: 2, gridColumnEnd: 11 }}
              color='textSecondary'
            >
              About {profile.displayName}
            </Typography>
            <Button
              variant='outlined'
              onClick={() => setEditMode(!editMode)}
              style={{ gridColumnStart: 11, gridColumnEnd: 13 }}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
            {editMode ? (
              <Box style={{ gridColumnStart: 1, gridColumnEnd: 13 }}>
                <ProfileForm profile={profile} />
              </Box>
            ) : (
              <Box style={{ gridColumnStart: 2, gridColumnEnd: 12 }}>
                <Typography variant='body1' className={classes.title}>
                  selfIntroduction
                </Typography>
                <Box mb={2} />
                <Box className={classes.textBox}>
                  <Typography variant='body1'>
                    {profile.selfIntroduction}
                  </Typography>
                </Box>
                <Typography variant='body1'>
                  Member since : {profile.createdAt.toDateString()}
                </Typography>
              </Box>
            )}
          </div>
        </Box>
      )}
    </div>
  );
}
