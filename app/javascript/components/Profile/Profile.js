import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';

const Profile = () => {
  const [friends, setFriends] = useState([])

  // useEffect(() => {
  //   //  get all genre from our API
  //   //  update genres in the state
  //   axios.get('api/v1/friends.json')
  //     .then(resp => {
  //       setFriends(resp.data.data)
  //     })
  //     .catch(resp => console.log(resp))
  // }, [friends.length])

  const grid = friends.map(friend => (
    <Friend
      key={friend.first_name}
      attributes={friends.attributes} />))

  return (
    <div>
      Profile
      {grid}
    </div>
  );
};

export default Profile;
