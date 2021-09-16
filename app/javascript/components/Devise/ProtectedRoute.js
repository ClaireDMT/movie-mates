import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from '../Store/auth-context';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/users/sign_in" />
      }
    />
  );
}

export default ProtectedRoute;
