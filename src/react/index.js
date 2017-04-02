import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from 'components/main.js'
import Main from 'components/pages/home/home.js'

window.onload = () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>,
    document.getElementById('main')
  )
};
