import React from 'react';
import { Avatar, Box, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(0),
    alignItems: 'center',
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
  avatar: {
    height: '100px',
    width: '100px',
  },
  description: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
  },
}));

export default function ShelfDetailedTitle({ photoURL, displayName }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <div className={classes.container}>
          <Avatar alt='Frank' src={photoURL} className={classes.avatar} />
          <Typography
            variant='h3'
            style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            className={classes.title}
            color='textSecondary'
          >
            {displayName}のオール・タイム・ベスト１０
          </Typography>
          <Typography
            variant='subtitle1'
            style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            className={classes.description}
          >
            Description
          </Typography>
          <Typography
            variant='body1'
            style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
          >
            ホラー、ドラマ、アクション映画などいろいろなジャンルが好きです。
            特に好きな監督はクエンティン・タランティーノとマーティンス・コセッシ。
            古い映画から最新の映画まで、年間６００本ほど鑑賞しています。
          </Typography>
        </div>
      </Box>
    </Paper>
  );
}
