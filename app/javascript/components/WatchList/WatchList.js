import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'

import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from '../Movies/Movie';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const location = useLocation().pathname;
    const isWatchList = location === "/watch_list"
    const url = location === "/watch_list" ? 'api/v1/user_movies.json' :  `/api/v1${location}.json`;
    axios.get(url, {
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
      {isWatchList && <h1>Your watch list</h1>}
      {!isWatchList && <h1>Screening with</h1>}

      {moviesList}
    </div>
  );
};

export default WatchList;
