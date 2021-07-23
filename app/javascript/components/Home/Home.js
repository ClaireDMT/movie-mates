import React, { useContext } from 'react';
import AuthContext from '../Store/auth-context';

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
