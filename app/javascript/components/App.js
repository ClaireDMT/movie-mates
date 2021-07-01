import React, { useContext, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//  IMPORT COMPONENTS
import AuthContext from './Store/auth-context';
import Home from './Home/Home';
import Movie from './Movie/Movie';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import Navbar from '../components/Navigation/Navbar';
import SignIn from '../components/Devise/Registrations/SignIn';
import Container from 'react-bootstrap/Container';

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
    <Fragment>
      <div className="d-flex justify-content-around align-items-center">
        {!isLoggedIn &&
          <Link to="/users/sign_in">Login</Link>
        }
        {isLoggedIn &&
          <button onClick={logoutHandler}>Sign Out</button>
        }
      </div>
      <Container className="main-container">
        <Switch>
        {isLoggedIn &&
          <Route path="/genres" component={Genres}/>
          }
        {isLoggedIn &&
          <Route path="/movies/:id" component={Movie} />
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
      </Container>
      <Navbar />
    </Fragment>
  )
};

export default App;
