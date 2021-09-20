import React from 'react';
import { Link } from "react-router-dom";
import home from '../../images/navbar/home.svg';
import chat from '../../images/navbar/chat.svg';
import popCorn from '../../images/navbar/popcorn.svg';
import user from '../../images/navbar/user.svg'
import Button from 'react-bootstrap/Button';

const Navbar = (props) => {
  return (
    <nav className="d-flex justify-content-around align-items-center">
      <Link to="/">
        <img src={home} alt=""/>
      </Link>
      <Link to="/screenings/new">
        <img src={popCorn} alt="" />
      </Link>
      <Link to="/">
        <img src={chat} alt="" />
      </Link>
      {!props.isLoggedIn &&
        <Link to="/users/sign_in">
          <img src={user} alt="" />
        </Link>
      }
      { props.isLoggedIn &&
        <Link to="/users/sign_in">
          <img src={user} alt="" />
        </Link>
      }
    </nav>
  );
};

export default Navbar;
