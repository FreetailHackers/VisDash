import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { browserHistory, Route } from 'react-router-dom';

import Main from './components/main.js'
import Home from './components/pages/home/home.js'

window.onload = () => {
  ReactDOM.render(
    <Router>
      <Main>
        <Route exact={true} path="/" component={Home} />
      </Main>
    </Router>,
    document.getElementById('main')
  )
};
