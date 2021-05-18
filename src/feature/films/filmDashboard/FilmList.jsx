import React from 'react';

import FilmListItem from './FilmListItem';

export default function FilmList({ filmList, button }) {
  return (
    <>
      {filmList.map((films) => (
        <FilmListItem films={films} key={films.id} button={button} />
      ))}
    </>
  );
}
