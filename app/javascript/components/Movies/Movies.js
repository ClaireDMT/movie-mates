import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from './SwipableMovie';
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
        console.log(resp.data.data);
        setMovies(resp.data.data);
      })
      .catch(resp => console.log(resp))
  }, [])

  const handleSwipe = (dir, movieId) => {
    console.log(dir);
    switch (dir) {
      case 'left':
        addToFavoriteMovies(movieId, "to watch");
        break;
      case 'right':
        addToScreeningMovies(movieId);
        break;
      case 'up':
        // addToFavoriteMovies(movieId, "liked!");
        break;
      case 'down':
        // addToFavoriteMovies(movieId, "disliked!");
        break;
      default:
        console.log('Sorry, you don\'t know how to swipe');
    }
  }

  const addToFavoriteMovies = (movieId) => {
    axios.post(`/api/v1/user_movies.json`,
      {
        "user_movie":
        {
          "movie_id": movieId
        }
      },
      {
        headers: authCtx.headers
      })
      .then(resp => {
        console.log(resp)
        // setMovies(resp.data.data);
      })
      .catch(resp => console.log(resp))
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
      console.log(resp)
      // setMovies(resp.data.data);
    })
    .catch(resp => console.log(resp))
  }

  const list = movies.map(movie => (
      <Movie
        key={movie.id}
        movieId={movie.id}
        attributes={movie.attributes}
        swiped={handleSwipe}
      />)
  )



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
