import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import {
  KeyboardArrowDown,
  Person,
  Settings,
  PowerSettingsNew,
} from '@material-ui/icons';
import squeezeFilmsIcon from '../../app/images/squeezeFilmsIcon.svg';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { singOutFirebase } from '../../app/firestore/firebaseService';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: '24px',
    marginRight: '8px',
    '& img': {
      width: '24px',
    },
  },
  filmIcon: {
    transform: 'translateY(-2px)',
  },
  displayName: {
    marginRight: '16px',
    textTransform: 'none',
  },
  avatar: {
    marginRight: '8px',
  },
}));

export default function SignedInMenu() {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  async function handleSingOut() {
    try {
      history.push('/');
      await singOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <Avatar
          alt='avater'
          src={currentUser.photoURL}
          className={classes.avatar}
        />
        <Typography
          variant='subtitle1'
          color='textPrimary'
          className={classes.displayName}
        >
          {currentUser.email}
        </Typography>
        <KeyboardArrowDown />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement='top-end'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon
                      className={`${classes.icon} ${classes.filmIcon}`}
                    >
                      <img
                        src={squeezeFilmsIcon}
                        alt=''
                        className={classes.squeezeFilmsIcon}
                      />
                    </ListItemIcon>
                    <Typography variant='inherit'>My Films</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.icon}>
                      <Person />
                    </ListItemIcon>
                    <Typography variant='inherit'>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.icon}>
                      <Settings />
                    </ListItemIcon>
                    <Typography variant='inherit'>My account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSingOut}>
                    <ListItemIcon className={classes.icon}>
                      <PowerSettingsNew />
                    </ListItemIcon>
                    <Typography variant='inherit'>Logout</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
