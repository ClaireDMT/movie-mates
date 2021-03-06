import React, { useContext, Fragment } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//  IMPORT COMPONENTS
import AuthContext from './Store/auth-context';
import ProtectedRoute from './Devise/ProtectedRoute';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import WatchList from './WatchList/WatchList';
import Screening from './Screening/Screening';
import NewScreening from './Screening/NewScreening';
import Navbar from '../components/Navigation/Navbar';
import SignIn from '../components/Devise/Registrations/SignIn';
import Container from 'react-bootstrap/Container';

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(authCtx);
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
      <Container className="main-container pt-3">
        <Switch>
          <ProtectedRoute  path="/screenings/new" component={NewScreening} />
          <ProtectedRoute  path="/watch_list" component={WatchList} />
          <ProtectedRoute  path="/screenings/:id/movies" component={Movies} />
          <ProtectedRoute  path="/screenings/:id/genres" component={Genres} />
          <ProtectedRoute  path="/screenings/:id/matches" component={Screening} />

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
      <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>
    </Fragment>
  )
};

export default App;
