import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import TinderCard from 'react-tinder-card';

const SwipableMovie = (props) => {

  return (
    <TinderCard
      className="swipable__movie__card"
      bg="primary" text="dark"
      onSwipe={(dir) => props.swiped(dir, props.movieId)}
      >
      <div>
        <Card.Img src={props.attributes.poster_url} className="" />
        <Card.Title>{props.attributes.en_title}</Card.Title>
      </div>
    </TinderCard>
  );
};

export default SwipableMovie;
