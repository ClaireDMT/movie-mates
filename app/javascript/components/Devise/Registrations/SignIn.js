import React, { useState, useRef, useContext } from 'react';
import AuthContext from '../../Store/auth-context';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignIn = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtxt = useContext(AuthContext);
  // const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const userData  = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };

    axios.post('/users/sign_in', {
      user: userData
    }
    )
    .then(resp => {
      if (resp.headers.authorization) {
        authCtxt.login(resp.headers.authorization);
        history.replace('/');

      } else {
        throw new Error(resp)
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  return (
    <div className="container">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}/>
          <Form.Text className="text-muted" >
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}/>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
