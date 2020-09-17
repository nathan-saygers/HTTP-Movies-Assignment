import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const MovieForm = props => {
  const [editedMovie, setEditedMovie] = useState(initialMovie);
  useEffect(() => {
    const movieToEdit = props.movies.find(movie => `${movie.id}` === props.match.params.id);
    console.log('movie form movie to edit', movieToEdit)
    if (movieToEdit) {
      setEditedMovie(movieToEdit);
    }
  }, [])

  const handleChanges = event => {
    if(event.target.name === 'stars') {
      let starsArr = event.target.value.split(', ')
      setEditedMovie(
        {...editedMovie, [event.target.name]: starsArr}
      )
    } else {
      setEditedMovie(
        {...editedMovie, [event.target.name]: event.target.value}
      )
    }
  }

  const formSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${editedMovie.id}`, editedMovie)
      .then(res => {
        props.updateMovies(res.data)
        props.history.push(`/movies/${editedMovie.id}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={formSubmit}>
      <input name="title" value={editedMovie.title} onChange={handleChanges} />
      <input name="director" value={editedMovie.director} onChange={handleChanges} />
      <input type="number" name="metascore" value={editedMovie.metascore} onChange={handleChanges} />
      <textarea name="stars" value={editedMovie.stars.join(", ")} onChange={handleChanges} />
      <button>Submit Changes</button>
    </form>
  )
}

export default MovieForm;