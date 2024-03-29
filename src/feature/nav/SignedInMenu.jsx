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
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { openModal } from '../../app/common/modals/modalReducer';

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
  const { currentUserProfile } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

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

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <Button ref={anchorRef} onClick={handleToggle}>
        <Avatar
          alt='avater'
          src={currentUserProfile?.photoURL || '/assets/user.png'}
          className={classes.avatar}
        />
        <Typography
          variant='subtitle1'
          color='textPrimary'
          className={classes.displayName}
        >
          {currentUserProfile?.displayName}
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
                  <MenuItem
                    onClick={() => {
                      history.push(`/shelfs/${currentUserProfile.id}`);
                      setOpen(false);
                    }}
                  >
                    <ListItemIcon
                      className={`${classes.icon} ${classes.filmIcon}`}
                    >
                      <img
                        src='/assets/logo.svg'
                        alt=''
                        className={classes.squeezeFilmsIcon}
                      />
                    </ListItemIcon>
                    <Typography variant='inherit'>My Films</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push(`/profile/${currentUserProfile.id}`);
                      setOpen(false);
                    }}
                  >
                    <ListItemIcon className={classes.icon}>
                      <Person />
                    </ListItemIcon>
                    <Typography variant='inherit'>Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      return dispatch(openModal({ modalType: 'AccountForm' }));
                    }}
                  >
                    <ListItemIcon className={classes.icon}>
                      <Settings />
                    </ListItemIcon>
                    <Typography variant='inherit'>My account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
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
