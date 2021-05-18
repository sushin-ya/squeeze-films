import './style.css';
// import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import FilmsDashboard from '../../feature/films/filmDashboard/FilmDashboard';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container maxWidth='lg' className={classes.container}>
        <FilmsDashboard />
      </Container>
    </>
  );
}
