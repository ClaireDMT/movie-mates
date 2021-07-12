import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  userId: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  }
})

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json',
    'Authorization': initialToken
  });

  const userIsLoggedIn = !!token;

  const loginHandler = (resp) => {
    setToken(resp.headers.authorization);
    setUserId(resp.data.id);
    setHeaders({ ...headers, 'Authorization': resp.headers.authorization});
    localStorage.setItem('token', resp.headers.authorization);
  }

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setHeaders({ ...headers, 'Authorization': '' })
    localStorage.removeItem('token');
  }

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    headers: headers
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
