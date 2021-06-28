import React, { useContext, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Movie from './Movie/Movie';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import Navbar from '../components/Navigation/Navbar';
import SignIn from '../components/Devise/Registrations/SignIn';
import AuthContext from './Store/auth-context';
import axios from 'axios';

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    axios.delete('/users/sign_out', {
      headers: {
        'Authorization': authCtx.token
      }
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
    <div className="">
      {isLoggedIn}
      <div className="d-flex justify-content-around align-items-center">
        {!isLoggedIn &&
          <Fragment>
            <Link to="/users/sign_in">Login</Link>
            {/* <Link to="/users/sign_up">Sign Up</Link> */}
          </Fragment>
        }
        {isLoggedIn &&
          <button onClick={logoutHandler}>Sign Out</button>
        }
      </div>

      <Switch>
        {isLoggedIn &&
          <Fragment>
            <Route path="/genres" component={Genres}/>
            <Route path="/movies/:id" component={Movie} />
          </Fragment>
        }

        <Route path="/" exact >
          {isLoggedIn && <Profile /> }
          {!isLoggedIn && <Redirect to='/'/>}
        </Route>

        <Route path="/users/sign_in" component={SignIn} />

        <Route path="*">
          <Redirect to='/' />
        </Route>

      </Switch>
      <Navbar />
    </div>
  )
};

export default App;
