import React from 'react';
import { Route, Switch, Link} from 'react-router-dom';
import Movie from './Movie/Movie';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import Navbar from '../components/Navigation/Navbar';
import SignIn from '../components/Devise/Registrations/SignIn';

const App = () => {
  return (
    <div className="">
      <div className="d-flex justify-content-around align-items-center">
        <Link to="/users/sign_in">Login</Link>
        <Link to="/users/sign_up">Sign Up</Link>
        <Link to="/users/sign_out">Sign Out</Link>
      </div>
      <Switch>
        <Route exact path="/genres" component={Genres}/>
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/" component={Profile} />
        <Route exact path="/users/sign_in" component={SignIn} />
        {/* <Route exact path="/users/sign_up" component={SignUp} />
        <Route exact path="/users/sign_out" component={SignOut} /> */}
      </Switch>
      <Navbar />
    </div>
  )
};

export default App;
