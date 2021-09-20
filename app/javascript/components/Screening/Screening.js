import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from '../Movies/Movie';

const Screening = () => {
  const [movies, setMovies] = useState([]);
  const authCtx = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    console.log(params);
    const url = `/api/v1/screenings/${params.id}/matches.json`;
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
    <Fragment>
      <h1>Screening with</h1>

      {moviesList}
    </Fragment>
  );
};

export default Screening;
