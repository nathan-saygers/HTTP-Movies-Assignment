import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import axios from 'axios';
import MovieForm from './Movies/MovieForm'
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([])
  
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])

  const updateMovies = editedMovie => {
    let filteredState = movies.filter(movie => editedMovie.id !== movie.id);
    setMovies(
      [...filteredState, editedMovie]
    )
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/" 
        render={props => {
          return <MovieList {...props} movies={movies} />
        }}  
      />
      <Route 
        path="/update-movie/:id" 
        render={props => {
          return <MovieForm {...props} movies={movies} updateMovies={updateMovies}/>
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
