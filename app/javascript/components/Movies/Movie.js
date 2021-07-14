import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Movie = (props) => {

  const genres = (props.attributes.genres.data).map(genre => (
    <Badge variant="primary" key={genre.id} className="d-inline-flex" >
      {genre.attributes.name}
    </Badge>

  ))
  return (
    <Card bg="dark" text="light" className="movie__card mb-3">
      <div>
        <Card.Title>{props.attributes.en_title}</Card.Title>
        <div className="d-flex justify-content-between">
          {genres}
        </div>
      </div>
      <Card.Img src={props.attributes.poster_url} className="" />
    </Card>
  );
};

export default Movie;
