import React from 'react';

import ShelfListItem from './ShelfListItem';

export default function ShelfList({ shelfs, button }) {
  return (
    <>
      {shelfs.map((shelf) => (
        <ShelfListItem shelf={shelf} key={shelf.id} button={button} />
      ))}
    </>
  );
}
