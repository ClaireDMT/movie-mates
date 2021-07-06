import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Genre from './Genre';
import Button from 'react-bootstrap/Button';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const params = useParams();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    //  get all genre from our API
    //  update genres in the state
    axios.get('/api/v1/genres.json', {
      headers: authCtx.headers
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

  const createScreeningGenres = () => {
    axios.post(`/api/v1/screenings/${params.id}/screening_genres.json`,
      {
        "screening_genre": selectedGenres
      }, {
        headers: authCtx.headers
      })
      .then(resp => {
        console.log(resp);
        history.push(`/screenings/${params.id}/movies`)
      })
      .catch(resp => console.log(resp))
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
      <h1 className="mb-2">What do you<br />want to watch?</h1>
      <Button
        onClick={createScreeningGenres}
        className="btn-submit-genres"
        variant="primary">done!</Button>
      <div className="genres__list">
        {grid}
      </div>

    </Fragment>
  );
};

export default Genres;
