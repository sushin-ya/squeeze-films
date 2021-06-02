import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import ShelfDashboardTitle from './ShelfDashboardTitle';
import ShelfDashboardNotice from './ShelfDashboardNotice';
import ShelfList from './ShelfList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShelfs } from '../shelfActions';
import { RETAIN_STATE } from '../shelfConstants';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function ShelfDashboard() {
  const classes = useStyles();
  const limit = 2;
  const dispatch = useDispatch();
  const { shelfs, moreShelfs, lastVisible, retainState } = useSelector(
    (state) => state.shelf
  );
  const { currentUserProfile } = useSelector((state) => state.profile);
  const [loadingInit, setLoadingInit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (retainState) return;
    setLoadingInit(true);
    dispatch(fetchShelfs(limit)).then(() => {
      setLoadingInit(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState]);

  async function handleFetchMoreShelfs() {
    try {
      setIsFetching(true);
      await dispatch(fetchShelfs(limit, lastVisible));
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDashboardTitle />
        {authenticated && !currentUserProfile.hasShelf && (
          <ShelfDashboardNotice button={classes.button} />
        )}
        <ShelfList
          shelfs={shelfs}
          button={classes.button}
          getNextShelfs={handleFetchMoreShelfs}
          loading={loadingInit}
          moreShelfs={moreShelfs}
          isFetching={isFetching}
        />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
