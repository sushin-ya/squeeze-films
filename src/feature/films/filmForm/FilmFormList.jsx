import { makeStyles, Typography } from '@material-ui/core';
import FilmFormListItem from './FilmFormListItem';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    border: '1px solid lightgrey',
    borderRadius: '2px',
  },
  title: {
    padding: theme.spacing(1),
  },
  filmList: {
    padding: '8px',
    minHeight: '100px',
  },
}));

export default function FilmFormList({ column, films }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant='h5' className={classes.title}>
        {column.title}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          const style = {
            backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white',
            ...provided.droppableProps.style,
          };
          return (
            <Typography
              component='div'
              className={classes.filmList}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              style={style}
            >
              {films.map((film, index) => (
                <FilmFormListItem key={film.id} film={film} index={index} />
              ))}
              {provided.placeholder}
            </Typography>
          );
        }}
      </Droppable>
    </div>
  );
}
