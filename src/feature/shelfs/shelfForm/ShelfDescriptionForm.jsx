import React from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function ShelfDetailedChatForm({ description, setDesciption }) {
  const handleChange = (event) => {
    setDesciption(event.target.value);
  };

  return (
    <Grid
      container
      direction='column'
      justify='flex-start'
      alignItems='flex-end'
    >
      <TextField
        id='description'
        label='Description'
        variant='outlined'
        fullWidth
        multiline
        rows='3'
        value={description}
        onChange={handleChange}
      />
    </Grid>
  );
}
