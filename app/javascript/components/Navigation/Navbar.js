import React, { useEffect, useRef, useState} from 'react';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Navbar = (props) => {
  const navBar = useRef();
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const listClasses = (Array.from(navBar.current.children).map( (x) => x.className))
    switch (listClasses.indexOf("navbar__link--active")) {
      case 0:
        setActiveNav("home");
        break;
      case 1:
        setActiveNav("chat");
        break;
      case 2:
        setActiveNav("watchList");
        break;
      default:
        setActiveNav("home");
    }
  });

  return (
    <nav className="d-flex justify-content-around align-items-center" ref={navBar}>
      <NavLink exact to="/" activeClassName="navbar__link--active" >
        { activeNav === "home"
           ? <PeopleIcon fontSize="large" />
           : <PeopleOutlineIcon fontSize="large" />
        }
      </NavLink>
      <NavLink to="/genres" activeClassName="navbar__link--active" >
        {activeNav === "chat"
          ? <ChatBubbleIcon fontSize="large" />
          : <ChatBubbleOutlineIcon fontSize="large" />
        }
      </NavLink>
      <NavLink to="/watch_list" activeClassName="navbar__link--active">
        {activeNav === "watchList"
          ? <FavoriteIcon fontSize="large" />
          : <FavoriteBorderIcon fontSize="large" />
        }
      </NavLink>
      {!props.isLoggedIn &&
        <Button variant="dark">
          <NavLink to="/users/sign_in">Login</NavLink>
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
