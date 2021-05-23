import React, { useEffect, useState } from 'react';

export default function Films() {
  const [fetchData, setFetchData] = useState();

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/550?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setFetchData(json));
  // }, []);

  console.log(fetchData);

  return (
    <>
      <div>test</div>
      {fetchData && (
        <>
          <div>{fetchData.id}</div>
          <div>{fetchData.original_title}</div>
          <div>{fetchData.release_date}</div>
        </>
      )}
    </>
  );
}
