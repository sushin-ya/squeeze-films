import { Box, List, makeStyles, Paper, Typography } from '@material-ui/core';
import FilmFormListItem from './FilmFormListItem';
import { Droppable } from 'react-beautiful-dnd';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  title: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  filmList: {
    padding: '8px',
    minHeight: '100px',
    transition: 'background-color 0.1s ease',
  },
}));

export default function FilmFormList({ column, films }) {
  const classes = useStyles();

  return (
    <Box boxShadow={1}>
      <Paper className={classes.container}>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          className={classes.title}
        >
          <Box mr={1}>
            <ListIcon fontSize='large' />
          </Box>
          <Typography variant='h5'>{column.title}</Typography>
        </Box>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => {
            const style = {
              backgroundColor: snapshot.isDraggingOver ? 'cyan' : 'orange',
              ...provided.droppableProps.style,
            };
            return (
              <List
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
              </List>
            );
          }}
        </Droppable>
      </Paper>
    </Box>
  );
}
