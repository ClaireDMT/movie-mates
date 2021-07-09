import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Store/auth-context';

import Friend from './Friend';

const Profile = () => {
  const [friends, setFriends] = useState([]);
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    //  get all genre from our API
    //  update genres in the state
    axios.get('api/v1/friends.json', {
      headers: authCtx.headers
    })
      .then(resp => {
        setFriends(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [friends.length])

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
