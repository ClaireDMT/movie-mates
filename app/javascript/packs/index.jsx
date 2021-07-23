// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./application.scss"
import App from '../components/App'
import { AuthContextProvider } from '../components/Store/auth-context';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AuthContextProvider>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </AuthContextProvider>,
    document.body.appendChild(document.createElement('div')),
  )
  const container = document.querySelector('body > div');
  container.classList.add("container","main-container");

})
