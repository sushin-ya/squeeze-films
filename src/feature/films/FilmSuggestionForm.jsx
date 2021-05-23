import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import FilmSuggestionCard from './FilmSuggestionCard';

async function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  } else {
    const suggestionValue = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${inputValue}&language=ja-JP`
      )
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        const suggestionFilms = results.map((film) => {
          const temp = {
            id: film.id,
            title: film.title,
            img: `https://image.tmdb.org/t/p/w200${film.poster_path}`,
            year:
              film.release_date === ''
                ? '0000'
                : film.release_date.substring(0, 4),
          };
          return temp;
        });
        return suggestionFilms;
      });
    return suggestionValue;
  }
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}
function renderSuggestion(suggestion) {
  return (
    <FilmSuggestionCard
      title={suggestion.title}
      year={suggestion.year}
      img={suggestion.img}
    />
  );
}

export default function FilmSuggestionForm() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const inputProps = {
    placeholder: 'Search your favorite film !',
    value,
    onChange: onChange,
  };

  function onChange(event, { newValue }) {
    setValue(newValue);
  }

  function onSuggestionsFetchRequested({ value }) {
    getSuggestions(value).then((res) => setSuggestions(res));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  function onSuggestionSelected(event, { suggestion, method }) {
    if (method === 'click' || method === 'enter') {
      console.log(suggestion);
      setValue('');
    }
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
