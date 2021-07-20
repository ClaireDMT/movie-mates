import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Store/auth-context';

import Friend from './Friend';

const Profile = () => {
  const [friends, setFriends] = useState([]);
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    axios.get('api/v1/friends.json', {
      headers: authCtx.headers
    })
      .then(resp => {
        console.log(resp);
        setFriends(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [])

  const grid = friends.map(friend => (
    <Friend
      key={friend.id}
      attributes={friend.attributes}
    />))

  return (
    <div>
      {grid}
    </div>
  );
};

export default Profile;
