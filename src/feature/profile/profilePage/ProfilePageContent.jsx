import React, { useState } from 'react';
import { makeStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import AboutTab from './AboutTab';
import PhotosTab from './PhotosTab';
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

export default function ProfilePageContent({ profile, isCurrentUser }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
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
      <AboutTab
        value={value}
        index={0}
        profile={profile}
        isCurrentUser={isCurrentUser}
      />
      <PhotosTab
        value={value}
        index={1}
        profile={profile}
        isCurrentUser={isCurrentUser}
      />
      <FollowingTab
        value={value}
        index={2}
        profile={profile}
        activeTab={activeTab}
        setValue={setValue}
      />
      <FollowingTab
        value={value}
        index={3}
        profile={profile}
        activeTab={activeTab}
        setValue={setValue}
      />
    </div>
  );
}
