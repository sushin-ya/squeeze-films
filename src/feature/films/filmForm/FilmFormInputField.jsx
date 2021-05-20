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

export default function FilmFormInputField() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete='off'>
      <TextField
        className={classes.label}
        id='outlined-basic'
        label='Search &amp; click your favorite film to add your all time best squeezed films !!!'
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
