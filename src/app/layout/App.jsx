import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import ShelfDashboard from '../../feature/shelfs/shelfDashboard/ShelfDashboard';
import ShelfDetailedPage from '../../feature/shelfs/shelfDetailed/ShelfDetailedPage';
import ShelfForm from '../../feature/shelfs/shelfForm/ShelfForm';
import { Container, makeStyles } from '@material-ui/core';
import { Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#F7F6F5',
  },
  container: {
    marginTop: '20px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container maxWidth='lg' className={classes.container}>
              <Route exact path='/shelfs' component={ShelfDashboard} />
              <Route path='/shelfs/:id' component={ShelfDetailedPage} />
              <Route path='/createShelf' component={ShelfForm} />
            </Container>
          </>
        )}
      />
    </div>
  );
}
