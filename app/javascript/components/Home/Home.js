import React, { useContext } from 'react';
import AuthContext from '../Store/auth-context';

import Profile from '../Profile/Profile';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <h1>Movie Mates</h1>
      <p>Please login!</p>
    </div>
  );
};

export default Home;
