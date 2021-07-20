import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from '../Movies/Movie';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios.get('api/v1/user_movies.json', {
      headers: authCtx.headers
    })
      .then(resp => {
        console.log(resp.data.data)
        setMovies(resp.data.data);
      })
      .catch(resp => console.log(resp))
  }, [])

  const moviesList = movies.map(movie => (
    <Movie
      key={movie.id}
      attributes={movie.attributes}>
    </Movie>
  ))

  return (
    <div>
      <h1>Your watch list</h1>
      {moviesList}
    </div>
  );
};

export default WatchList;
