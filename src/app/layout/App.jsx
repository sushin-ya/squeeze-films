import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import FilmsDashboard from '../../feature/films/filmDashboard/FilmDashboard';
import FilmDetailedPage from '../../feature/films/filmDetailed/FilmDetailedPage';
import FilmForm from '../../feature/films/filmForm/FilmForm';
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
              <Route exact path='/films' component={FilmsDashboard} />
              <Route path='/films/:id' component={FilmDetailedPage} />
              <Route path='/createFilms' component={FilmForm} />
            </Container>
          </>
        )}
      />
    </div>
  );
}
