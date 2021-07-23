import React, { useContext, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//  IMPORT COMPONENTS
import AuthContext from './Store/auth-context';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import WatchList from './WatchList/WatchList';
import Navbar from '../components/Navigation/Navbar';
import SignIn from '../components/Devise/Registrations/SignIn';

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    axios.delete('/users/sign_out', {
      headers: authCtx.headers
    })
      .then(resp => {
        console.log(resp);
        if (resp.statusText === "OK") {
          authCtx.logout();
        }
      })
      .catch(resp => console.log(resp))
  }

  return (
    <Fragment>
      <Switch>
      {isLoggedIn &&
        <Route path="/genres" component={Genres}/>
        }
      {isLoggedIn &&
        <Route path="/screenings/:id/movies" component={Movies} />
      }
      {isLoggedIn &&
        <Route path="/watch_list" component={WatchList} />
      }
      {isLoggedIn &&
        <Route path="/screenings/:id" component={Genres} />
      }


      <Route path="/" exact >
        {isLoggedIn && <Profile /> }
        {!isLoggedIn && < Home />}
      </Route>

      <Route path="/users/sign_in" component={SignIn} />

      <Route path="*">
        <Redirect to='/' />
      </Route>

    </Switch>
      <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>
    </Fragment>
  )
};

export default App;
