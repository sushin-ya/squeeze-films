import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';

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
}));

export default function AboutTab({
  value,
  index,
  displayName,
  selfIntroduction,
  createdAt,
}) {
  const classes = useStyles();

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
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
              color='textSecondary'
            >
              About {displayName}
            </Typography>
            <Typography
              variant='body1'
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
              className={classes.title}
            >
              <Box mb={1}>selfIntroduction</Box>
            </Typography>
            <Typography
              variant='body1'
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            >
              <Box mb={2}>
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
                {selfIntroduction}
              </Box>
            </Typography>
            <Typography
              variant='body1'
              style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            >
              Member since : {createdAt}
            </Typography>
          </div>
        </Box>
      )}
    </div>
  );
}
