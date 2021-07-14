import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignUp from './components/Signup';
import Login from './components/Login';
import { LOGIN, SIGNUP } from './constants/routes';
import { checkIfAccesstokenIsValid } from './utils';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect path="/" exact to={LOGIN} />
          {!checkIfAccesstokenIsValid() && (
            <Route path={LOGIN} exact component={Login} />
          )}
          <Route path={SIGNUP} exact component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
