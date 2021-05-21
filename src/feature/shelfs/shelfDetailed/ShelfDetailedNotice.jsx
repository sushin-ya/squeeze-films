import React from 'react';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  icon: {
    transform: `translateY(-1px)`,
  },
  text: {
    flexGrow: 1,
  },
  strong: {
    textDecoration: `underline dotted ${theme.palette.primary.main} 2px`,
    fontSize: '18px',
  },
}));

export default function ShelfDetailedNotice({ button }) {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Paper>
        <Box p={2} display='flex' alignItems='center'>
          <Box mr={1}>
            <ErrorOutline className={classes.icon} />
          </Box>
          <Typography variant='body1' className={classes.text}>
            オール・タイム・ベストを最新化しましょう！
          </Typography>
          <Button variant='contained' className={button}>
            Edit Films
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
