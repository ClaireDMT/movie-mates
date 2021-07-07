import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { TinderCard } from 'react-tinder-card';

const Movie = (props) => {

  return (
    <TinderCard
      className="movie__card"
      bg="primary" text="dark"
      // onSwipe={onSwipe}
      // onCardLeftScreen={() => onCardLeftScreen('fooBar')}
      // preventSwipe={['right', 'left']}
      >
      <div>
        <Card.Img src={props.attributes.poster_url} className="" />
        <Card.Title>{props.attributes.en_title}</Card.Title>
      </div>
    </TinderCard>
  );
};

export default Movie;
