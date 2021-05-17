import './style.css';
// import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
import FilmsDashboard from '../../feature/films/filmsDashboard/FilmsDashboard';
import { Container } from '@material-ui/core';

export default function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg'>
        <FilmsDashboard />
      </Container>
    </>
  );
}
