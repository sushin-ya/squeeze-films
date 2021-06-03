import { useCallback } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { DragDropContext } from 'react-beautiful-dnd';
import ShelfFormList from './ShelfFormList';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
  },
}));

export default function ShelfFormDragAndDrop({ data, setData }) {
  const classes = useStyles();

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const start = data.columns[source.droppableId];
      const finish = data.columns[destination.droppableId];

      if (start === finish) {
        const newfilmIds = Array.from(start.filmIds);
        newfilmIds.splice(source.index, 1);
        newfilmIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          filmIds: newfilmIds,
        };

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
          },
        };

        setData(newData);
        return;
      }

      const startfilmIds = Array.from(start.filmIds);
      startfilmIds.splice(source.index, 1);
      const newStart = {
        ...start,
        filmIds: startfilmIds,
      };

      const finishfilmIds = Array.from(finish.filmIds);
      finishfilmIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        filmIds: finishfilmIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      setData(newData);
    },
    [data, setData]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId, index) => {
        const column = data.columns[columnId];
        const films = column.filmIds.map((filmId) => data.films[filmId]);

        if (index === 0) {
          return (
            <div key={column.id}>
              <ShelfFormList column={column} films={films} />
              <Box
                m={2}
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
              >
                <ArrowDownwardIcon className={classes.icon} />
                <Typography variant='h5' color='textPrimary'>
                  Drag &amp; Drop
                </Typography>
              </Box>
            </div>
          );
        } else {
          return (
            <ShelfFormList key={column.id} column={column} films={films} colr />
          );
        }
      })}
    </DragDropContext>
  );
}
