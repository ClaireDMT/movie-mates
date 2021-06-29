import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import Genre from './Genre';
import AuthContext from '../Store/auth-context';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    //  get all genre from our API
    //  update genres in the state
    axios.get('/api/v1/genres.json', {
      headers: {
        'Authorization': authCtx.token
      }
    })
    .then( resp => {
      setGenres(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [genres.length])

  const toggleSelect = (genreId) => {
    const index = selectedGenres.indexOf(genreId)
    if (index === -1 ) {
      setSelectedGenres((prevState) => [...prevState, genreId])
    } else {
      const newList = [...selectedGenres];
      newList.splice(index, 1);
      setSelectedGenres(newList);
    }
  }



  const grid = genres.map( genre => {
    const selected = selectedGenres.includes(genre.id)
    return(
      <Genre
        onClick={() => toggleSelect(genre.id)}
        key={genre.id}
        attributes={genre.attributes}
        selected={selected}
      />)
  })
  return (
    <Fragment>
      <h1>What do you<br />want to watch?</h1>
      <div className="genres__list">
        {grid}
      </div>
    </Fragment>
  );
};

export default Genres;
