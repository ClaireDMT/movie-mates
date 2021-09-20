import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Movie = (props) => {

  const genres = (props.attributes.genres.data).map(genre => (
    <Badge variant="primary" key={genre.id} className="d-inline-flex mr-1" >
      {genre.attributes.name}
    </Badge>

  ))
  return (
    <Card bg="dark" text="light" className="movie__card mb-3">
      <div className="movie__card__infos p-2 pt-3">
        <Card.Title>{props.attributes.en_title}</Card.Title>
        <div className="d-flex justify-content-around" >
          <p>{props.attributes.imdb_rating}</p>
          <p>{props.attributes.year}</p>
        </div>
        <div className="">
          {genres}
        </div>
      </div>
      <Card.Img src={props.attributes.poster_url} className="" />
    </Card>
  );
};

export default Movie;
