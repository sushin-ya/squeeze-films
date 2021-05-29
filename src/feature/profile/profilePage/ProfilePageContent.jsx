import React from 'react';
import { makeStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import AboutTab from './AboutTab';
import PhotosTab from './PhotosTab';
import FollowersTab from './FollowersTab';
import FollowingTab from './FollowingTab';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfilePageContent({ profile }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='About' {...a11yProps(0)} />
          <Tab label='Photos' {...a11yProps(1)} />
          <Tab label='Followers' {...a11yProps(2)} />
          <Tab label='Following' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <AboutTab value={value} index={0} profile={profile} />
      <PhotosTab value={value} index={1} profile={profile} />
      <FollowersTab value={value} index={2} />
      <FollowingTab value={value} index={3} />
    </div>
  );
}
