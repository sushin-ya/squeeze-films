import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({}));

export default function PhotosTab({ value, index }) {
  // eslint-disable-next-line
  const classes = useStyles();

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>PhotosTab</Typography>
        </Box>
      )}
    </div>
  );
}
