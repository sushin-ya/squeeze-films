import React from 'react';
import ShelfListItem from './ShelfListItem';
import InfiniteScroll from 'react-infinite-scroller';

export default function ShelfList({
  shelfs,
  button,
  getNextShelfs,
  loading,
  moreShelfs,
  isFetching,
}) {
  return (
    <>
      {shelfs.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={!isFetching && getNextShelfs}
          hasMore={!loading && moreShelfs}
          initialLoad={false}
        >
          {shelfs.map((shelf) => (
            <ShelfListItem shelf={shelf} key={shelf.id} button={button} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
