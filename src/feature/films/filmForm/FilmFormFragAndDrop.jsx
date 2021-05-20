import initialData from '../../../app/api/initial-data';
import { useCallback, useState } from 'react';
import FilmFormList from './FilmFormList';
import { DragDropContext } from 'react-beautiful-dnd';

export default function FilmFormDragAndDrop() {
  const [data, setData] = useState(initialData);

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
    [data]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const films = column.filmIds.map((filmId) => data.films[filmId]);

        return <FilmFormList key={column.id} column={column} films={films} />;
      })}
    </DragDropContext>
  );
}
