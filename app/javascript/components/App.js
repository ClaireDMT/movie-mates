import React from 'react';
import { Route, Switch} from 'react-router-dom'
import Movie from './Movie/Movie'
const App = () => {
  return (
    <Switch>
      <Route exact path="/movies/:id" component={Movie} />
      <Route exact path="/movies" component={Movies}/>
    </Switch>
  )
};

export default App;
