import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from './SwipableMovie';
import SwipeButtons from './SwipeButtons';
import { Modal, Button } from "react-bootstrap";

const Movies = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModal] = useState(false);

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
        addToFavoriteMovies(movieId, false);
        break;
      case 'right':
        addToScreeningMovies(movieId);
        break;
      case 'down':
        addToFavoriteMovies(movieId, true);
        break;
      default:
        console.log('Sorry, you don\'t know how to swipe');
    }
  }

  const addToFavoriteMovies = (movieId, isToWatch) => {
    axios.post(`/api/v1/user_movies.json`,
      {
        "user_movie":
        {
          "movie_id": movieId,
          "watched": !isToWatch,
          "toWatch": isToWatch,
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
      console.log(resp);
      if (resp.data.status === "voted_by_all") {
        openModal();
      }
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

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);


  return (
    < Fragment>
      <div className="movies__list">
        {list}
      </div>
      <Modal show={modalOpen}  dialogClassName="match-modal">
        <h2>Yippie-Ki-Yay</h2>
        <p>You and X would like to watch this movie</p>
      </Modal>
    </Fragment>
  );
};

export default Movies;
