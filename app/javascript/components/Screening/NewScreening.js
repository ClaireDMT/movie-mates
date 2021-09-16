import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";

import axios from 'axios';
import AuthContext from '../Store/auth-context';
import Button from 'react-bootstrap/Button';

const NewScreening = () => {
  const [friends, setFriends] = useState([]);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const createScreening = (friendId) => {
    axios.post('/api/v1/screenings.json',
      {
        "screening": {
          "user2_id": friendId
        }
      }, {
      headers: authCtx.headers
    })
      .then(resp => {
        history.push(`/screenings/${resp.data.data.id}/genres`)
      })
      .catch(resp => console.log(resp))
  }

  useEffect(() => {
    axios.get('/api/v1/friends.json', {
      headers: authCtx.headers
    })
      .then(resp => {
        console.log(resp);
        setFriends(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [])

  const grid = friends.map(friend => (
    <div className="d-flex" key={friend.id}>
      <img className="avatar" src={friend.attributes.picture}/>
      <h3>{friend.attributes.first_name}</h3>
      <Button onClick={() => createScreening(friend.attributes.id)} variant="light">New session</Button>

    </div>
  ))

  return (
    <div>
      <h1>Let's watch something</h1>
      <Button onClick={() => createScreening(null)} variant="success">just me</Button>
      <h3>With someone</h3>
      {grid}
    </div>
  );
};

export default NewScreening;
