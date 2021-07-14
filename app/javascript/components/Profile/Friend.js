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


  const sessions = props.attributes.screenings.map(screening => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(screening.created_at).toLocaleDateString([], options);
    return (
      <div key={screening.id} className="d-flex justify-content-between align-items-center mb-1">
        <p className="mb-0">{date}</p>
        <Link to={'/screenings/' + screening.id + '/movies'} >
          <Button variant="dark">Keep Swiping</Button>
        </Link>
      </div>
    )
  })

  return (
    <Card bg="primary" text="dark" className="friend__card">
      <div className="d-flex justify-content-end align-items-center mb-4">
        <Card.Title className="mr-5">{props.attributes.first_name}</Card.Title>
        <Card.Img src={props.attributes.picture} className="avatar-large" />
      </div>
      <div className="mb-4">
        <h5>Ongoing Sessions</h5>
        {sessions}
      </div>
      <Button onClick={() => createScreening(props.attributes.id)} variant="light">New session</Button>
    </Card>
  );
};

export default Friend;
