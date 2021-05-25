import React from 'react';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { ErrorOutline, Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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

export default function ShelfDashboardNotice({ button }) {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Paper>
        <Box p={2} display='flex' alignItems='center'>
          <Box mr={1}>
            <ErrorOutline className={classes.icon} />
          </Box>
          <Typography variant='body1' className={classes.text}>
            あなたもリストを作りたい？
            <span className={classes.strong}>Squeeze</span>しましょう！
          </Typography>
          <Button
            variant='contained'
            className={button}
            startIcon={<Add />}
            component={Link}
            to={`/createShelf`}
          >
            Squeeze Films
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
