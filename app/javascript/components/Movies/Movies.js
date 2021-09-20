import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Movie from './SwipableMovie';
import SwipeButtons from './SwipeButtons';
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Movies = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [screening, setScreening] = useState({});
  const [modalOpen, setModal] = useState(false);
  const [otherUser, setOtherUser] = useState({});
  const [lastMovie, setLastMovie] = useState({});

  useEffect(() => {
    axios.get(`/api/v1/screenings/${params.id}`, {
      headers: authCtx.headers
    })
      .then(resp => {
        const screening = resp.data.data;
        setScreening(screening);
        if (authCtx.userId === screening.attributes.user1.id) {
          setOtherUser(screening.attributes.user2)
        } else {
          setOtherUser(screening.attributes.user1)
        }
      })
      .catch(resp => console.log(resp))
  }, [])

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
      console.log(resp.data);
      if (resp.data.match === true) {
        setLastMovie(resp.data.movie.data.attributes);
        openModal();
      }
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
        <h2>Yippie-Ki-Yay!</h2>
        <p>{otherUser.first_name} also wants to watch</p>
        <img src={lastMovie.poster_url} className="" />
        <p>{lastMovie.en_title}</p>
        <Link to={'/screenings/' + screening.id + '/matches'} >
          <Button variant="info">See all matches</Button>
        </Link>
        <Link to="/">
          <Button variant="light">Send message</Button>
        </Link>
        <Button onClick={closeModal} variant="dark">Keep swiping</Button>
      </Modal>
    </Fragment>
  );
};

export default Movies;
