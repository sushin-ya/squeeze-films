import { Box, Container, makeStyles } from '@material-ui/core';
import { Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';

import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import ShelfDashboard from '../../feature/shelfs/shelfDashboard/ShelfDashboard';
import ShelfDetailedPage from '../../feature/shelfs/shelfDetailed/ShelfDetailedPage';
import ShelfForm from '../../feature/shelfs/shelfForm/ShelfForm';
import FilmSuggestionForm from '../../feature/sandbox/FilmSuggestionForm';
import PopularPage from '../../feature/popular/PopularPage';
import ErrorComponent from '../common/error/ErrorComponent';
import ModalManager from '../common/modals/ModalManager';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../feature/profile/profilePage/ProfilePage';

const useStyles = makeStyles({
  background: {
    backgroundColor: '#F7F6F5',
  },
});

export default function App() {
  const classes = useStyles();
  const { initialized } = useSelector((state) => state.async);
  const { key } = useLocation();

  if (!initialized) return <LoadingComponent content='Loading app...' />;

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Box pt={9} className={classes.background}>
              <Container maxWidth='lg'>
                <Route exact path='/shelfs' component={ShelfDashboard} />
                <Route path='/shelfs/:id' component={ShelfDetailedPage} />
                <PrivateRoute path={'/profile/:id'} component={ProfilePage} />
                <Route path='/popular' component={PopularPage} />
                <PrivateRoute
                  path={['/createShelf', '/manage/:id']}
                  component={ShelfForm}
                  key={key}
                />
                <Route path='/sandbox' component={FilmSuggestionForm} />
                <Route path='/error' component={ErrorComponent} />
              </Container>
            </Box>
          </>
        )}
      />
    </>
  );
}
