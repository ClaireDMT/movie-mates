import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Movie from './Movie/Movie';
import Genres from './Genres/Genres';

const App = () => {
  return (
    <Switch>
      <Route exact path="/genres" component={Genres}/>
      <Route exact path="/movies/:id" component={Movie} />
    </Switch>
  )
};

export default App;
