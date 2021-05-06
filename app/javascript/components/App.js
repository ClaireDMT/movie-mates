import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Movie from './Movie/Movie';
import Genres from './Genres/Genres';
import Profile from './Profile/Profile';
import Navbar from '../components/Navigation/Navbar';

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/genres" component={Genres}/>
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/" component={Profile} />
      </Switch>
    </div>
  )
};

export default App;
