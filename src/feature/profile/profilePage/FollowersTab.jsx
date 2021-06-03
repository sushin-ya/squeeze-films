import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function FollowersTab({ value, index }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>FollowersTab</Typography>
        </Box>
      )}
    </div>
  );
}
