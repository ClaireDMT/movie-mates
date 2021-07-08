import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from './Movie';
import SwipeButtons from './SwipeButtons';

const Movies = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/screenings/${params.id}/movies.json`, {
      headers: authCtx.headers
    })
      .then(resp => {
        setMovies(resp.data.data);
      })
      .catch(resp => console.log(resp))
  }, [movies.length])

  const handleSwipe = (dir, movieId) => {
    switch (dir) {
      case 'toleft':
        addToFavoriteMovies(movieId, "to watch");
      case 'toright':
        addToScreeningMovies(movieId);
      case 'toup':
        addToFavoriteMovies(movieId, "liked!");
      case 'todown':
        addToFavoriteMovies(movieId, "disliked!");
      default:
        console.log('Sorry, you don\'t know how to swipe');
    }
  }

  const addToScreeningMovies = (movieId) => {
    axios.post(`/api/v1/screenings/${params.id}/screening_movies.json`,
    {
      "movie_id": movieId
    },
    {
      headers: authCtx.headers
    })
      .then(resp => {
        setMovies(resp.data.data);
      })
      .catch(resp => console.log(resp))
  }

  const list = movies.map(movie => {
    return (
      <Movie
        key={movie.id}
        movieId={movie.id}
        attributes={movie.attributes}
        swiped={handleSwipe}
      />)
  })



  return (
    < Fragment>
      <SwipeButtons />
      <div className="movies__list">
        {list}
      </div>
    </Fragment>
  );
};

export default Movies;
