import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearSuggestedFilm,
  fetchSuggestedFilm,
} from '../../../app/tmdb/tmdbReducer';

const useStyles = makeStyles((theme) => ({
  label: {
    '& > label': {
      color: theme.palette.text.primary,
    },
  },
}));

export default function FlimAutoCompleteForm({ data, setData }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { suggestedFilm } = useSelector((state) => state.tmdb);

  useEffect(() => {
    const filteredSuggestion = suggestedFilm.filter(
      (s) => !Object.keys(data.films).includes(s.id)
    );
    setSuggestions(filteredSuggestion);
  }, [suggestedFilm, data.films]);

  useEffect(() => {
    if (inputValue === '') {
      setSuggestions([]);
      dispatch(clearSuggestedFilm());
    }
  }, [inputValue, dispatch]);

  function onInputChangeHandler(event, value) {
    if (!event) {
      return;
    }

    if (event && event.type === 'change') {
      setInputValue(value);
      onSuggestionsFetchRequested(value);
    } else if (event && event.type === 'click' && value === '') {
      setInputValue('');
    }
  }

  function onChangeHandler(event, value) {
    if (!event) {
      return;
    }

    if (event && event.type === 'click') {
      const suggestionData = suggestions.filter(
        (suggestion) => suggestion.title === value
      )[0];
      setData(suggestionData);
      setInputValue('');
    }
  }

  function onSuggestionsFetchRequested(value) {
    getSuggestions(value);
  }

  function getSuggestions(value) {
    const inputLength = value.length;

    if (inputLength === 0) {
      return [];
    } else {
      dispatch(fetchSuggestedFilm(value));
    }
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      id='free-solo-demo'
      freeSolo
      blurOnSelect
      onChange={(event, value) => onChangeHandler(event, value)}
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
