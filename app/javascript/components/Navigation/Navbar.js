import React from 'react';
import { Link } from "react-router-dom";
import friends from '../../images/friends.png';
import watchList from '../../images/movie_blue.png';
import popCorn from '../../images/popcorn_blue.png';
import Button from 'react-bootstrap/Button';

const Navbar = (props) => {
  return (
    <nav className="d-flex justify-content-around align-items-center">
      <Link to="/">
        <img src={friends} alt=""/>
      </Link>
      <Link to="/genres">
        <img src={popCorn} alt="" />
      </Link>
      <Link to="/watch_list">
        <img src={watchList} alt="" />
      </Link>
      {!props.isLoggedIn &&
        <Button variant="dark">
          <Link to="/users/sign_in">Login</Link>
        </Button>
      }
      {props.isLoggedIn &&
        <Button variant="dark" onClick={props.logoutHandler}>
          Sign Out
        </Button>
      }
    </nav>
  );
};

export default Navbar;
