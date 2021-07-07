import React from 'react';
import { Link } from "react-router-dom";
import friends from '../../images/friends.png';
import watchList from '../../images/movie_blue.png';
import popCorn from '../../images/popcorn_blue.png';

const Navbar = () => {
  return (
    <nav className="d-flex justify-content-around align-items-center">
      <Link to="/">
        <img src={friends} alt=""/>
      </Link>
      <Link to="/genres">
        <img src={popCorn} alt="" />
      </Link>
      <Link to="/movies">
        <img src={watchList} alt="" />
      </Link>
    </nav>
  );
};

export default Navbar;
