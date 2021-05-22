import React from 'react';
import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  label: {
    '& > label': {
      color: theme.palette.text.primary,
    },
  },
}));

export default function ShelfFormInputField() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete='off'>
      <TextField
        className={classes.label}
        id='outlined-basic'
        label="Let's search for your favorite films !!!"
        variant='outlined'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
