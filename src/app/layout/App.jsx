import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import ShelfDashboard from '../../feature/shelfs/shelfDashboard/ShelfDashboard';
import ShelfDetailedPage from '../../feature/shelfs/shelfDetailed/ShelfDetailedPage';
import ShelfForm from '../../feature/shelfs/shelfForm/ShelfForm';
import FilmSuggestionForm from '../../feature/sandbox/FilmSuggestionForm';
import { Box, Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';
import PopularPage from '../../feature/popular/PopularPage';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/error/ErrorComponent';
import ModalManager from '../common/modals/ModalManager';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfileList from '../../feature/profile/profilePage/ProfileList';
import ProfilePage from '../../feature/profile/profilePage/ProfilePage';

const useStyles = makeStyles({
  background: {
    backgroundColor: '#F7F6F5',
  },
});

export default function App() {
  const classes = useStyles();
  const { initialized } = useSelector((state) => state.async);

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
                <Route exact path='/profile' component={ProfileList} />
                <Route path='/profile/:id' component={ProfilePage} />
                <Route path='/popular' component={PopularPage} />
                <Route
                  path={['/createShelf', '/manage/:id']}
                  component={ShelfForm}
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
