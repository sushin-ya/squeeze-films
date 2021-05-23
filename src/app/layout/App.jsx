import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import ShelfDashboard from '../../feature/shelfs/shelfDashboard/ShelfDashboard';
import ShelfDetailedPage from '../../feature/shelfs/shelfDetailed/ShelfDetailedPage';
import ShelfForm from '../../feature/shelfs/shelfForm/ShelfForm';
import Films from '../../feature/films/Films';
import { Box, Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles({
  background: {
    backgroundColor: '#F7F6F5',
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <>
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
                <Route
                  path={['/createShelf', '/manage/:id']}
                  component={ShelfForm}
                />
                <Route path='/films' component={Films} />
              </Container>
            </Box>
          </>
        )}
      />
    </>
  );
}
