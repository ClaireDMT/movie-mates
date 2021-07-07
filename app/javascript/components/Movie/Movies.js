import React, { useEffect, useState, useContext } from 'react';
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
    console.log(params);
    axios.get(`/api/v1/screenings/${params.id}/movies.json`, {
      headers: authCtx.headers
    })
      .then(resp => {
        setMovies(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [movies.length])

  const list = movies.map(movie => {
    return (
      <Movie
        key={movie.id}
        attributes={movie.attributes}
      />)
  })

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <div className="movies__list">
      {list}
      <SwipeButtons />
    </div>
  );
};

export default Movies;
