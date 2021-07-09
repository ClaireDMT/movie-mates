import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";

import axios from 'axios';
import AuthContext from '../Store/auth-context';

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Friend = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const createScreening = (friendId) => {
    axios.post('api/v1/screenings.json',
      {
        "screening": {
          "user2_id": friendId
        }
      }, {
        headers: authCtx.headers
    })
      .then(resp => {
        history.push(`/screenings/${resp.data.data.id}`)
      })
      .catch(resp => console.log(resp))
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
