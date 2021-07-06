import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
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
  const [token, setToken] = useState(null);
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    setHeaders({ ...headers, 'Authorization': token});
    localStorage.setItem('token', token);
  }

  const logoutHandler = () => {
    setToken(null);
    setHeaders({ ...headers, 'Authorization': '' })
    localStorage.removeItem('token');
  }

  const contextValue = {
    token: token,
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
