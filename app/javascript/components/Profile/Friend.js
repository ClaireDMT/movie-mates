import React from 'react';
import { Link } from "react-router-dom";

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Friend = (props) => {

  const createScreening = (friend) => {

  }

  return (
    <Card bg="primary" text="dark" className="friend__card">
      <Button onClick={() => createScreening(props.attributes.id)} variant="light">Watch with</Button>
      <Card.Title>{props.attributes.first_name}</Card.Title>
      <Card.Img src={props.attributes.picture} className="avatar-large" />
    </Card>
  );
};

export default Friend;
