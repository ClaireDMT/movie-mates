import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

const Movie = (props) => {
  return (
    <Card bg="primary" text="dark" className="movie__card">
      <Card.Img src={props.attributes.poster_url} className="" />
      <Card.Title>{props.attributes.en_title}</Card.Title>
    </Card>
  );
};

export default Movie;
