import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: {
    '& > label': {
      color: theme.palette.text.primary,
    },
  },
}));

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

export default function FlimAutoCompleteForm({ setData }) {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function onInputChangeHandler(event, value) {
    if (!event) {
      return;
    }

    if (event && event.type === 'change') {
      setInputValue(value);
      onSuggestionsFetchRequested(value);
    } else if (event && event.type === 'click' && value === '') {
      setInputValue('');
      setSuggestions([]);
    } else if (event && event.type === 'click') {
      console.log(event);
      console.log(value);
      // setData
      setInputValue('');
      setSuggestions([]);
    }
  }

  function onSuggestionsFetchRequested(value) {
    getSuggestions(value).then((res) => setSuggestions(res));
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      id='free-solo-demo'
      freeSolo
      blurOnSelect
      onInputChange={(event, value) => onInputChangeHandler(event, value)}
      options={suggestions.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          id='outlined-basic'
          margin='normal'
          variant='outlined'
          className={classes.label}
          label="Let's search for your favorite films !!!"
          fullWidth
        />
      )}
    />
  );
}
