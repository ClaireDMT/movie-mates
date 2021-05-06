import React from 'react';
import { Link } from "react-router-dom";
import home from '../../images/home.svg';
import watchList from '../../images/watch-list-5.svg';
import popCorn from '../../images/popcorn.svg';


const Navbar = () => {
  return (
    <nav className="d-flex justify-content-around align-items-center">
      <Link to="/">
        <img src={home} alt=""/>
      </Link>
      <Link to="/genres">
        <img src={popCorn} alt="" />
      </Link>
      <Link to="/genres">
        <img src={watchList} alt="" />
      </Link>
    </nav>
  );
};

export default Navbar;
