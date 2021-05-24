import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

async function getSuggestions(value) {
  const inputLength = value.length;

  if (inputLength === 0) {
    return [];
  } else {
    const suggestionValue = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${value}&language=ja-JP`
      )
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        const suggestionFilms = results.map((film) => {
          const temp = {
            id: film.id,
            title: film.title,
            img:
              film.poster_path &&
              `https://image.tmdb.org/t/p/w200${film.poster_path}`,
            year: film.release_date && film.release_date.slice(0, 4),
          };
          return temp;
        });
        return suggestionFilms;
      });
    return suggestionValue;
  }
}

export default function FlimAutoCompleteForm() {
  const [suggestions, setSuggestions] = useState([]);

  function onInputChangeHandler(event, value, reason) {
    onSuggestionsFetchRequested(value);
  }

  function onSuggestionsFetchRequested(value) {
    getSuggestions(value).then((res) => setSuggestions(res));
  }

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        onInputChange={(event, value, reason) =>
          onInputChangeHandler(event, value, reason)
        }
        options={suggestions.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='freeSolo'
            margin='normal'
            variant='outlined'
          />
        )}
      />
    </div>
  );
}
