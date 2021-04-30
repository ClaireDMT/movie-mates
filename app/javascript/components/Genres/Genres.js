import React , { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Genre from './Genre';
import './Genres.scss';

const Genres = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    //  get all genre from our API
    //  update genres in the state
    axios.get('api/v1/genres.json')
    .then( resp => {
      setGenres(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [genres.length])

  const grid = genres.map( genre => {
    return(
      <Genre
        key={genre.id}
        attributes={genre.attributes}
      />)
  })
  return (
    <Fragment>
      <h1>Select a movie genre</h1>
      <div className="genres__list">
        {grid}
      </div>
    </Fragment>
  );
};

export default Genres;
