import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';

// route components
import AppContainer from '../../ui/App.js';
import NotFoundPage from '../../ui/pages/Notfound'
import Join from '../../ui/pages/Join'
import Login from '../../ui/pages/Login'
import Register from '../../ui/pages/Register'
import Profile from '../../ui/pages/Profile'
import UserList from '../../ui/pages/UserList'

const browserHistory = history.createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={AppContainer}/>
      <Route exact path="/join" component={Join}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/userlist" component={UserList}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);