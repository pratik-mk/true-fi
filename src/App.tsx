import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import Header from './components/Header';
import { LOGIN, SIGNUP, DASHBOARD, QUESTIONS } from './constants/routes';
import { checkIfAccesstokenIsValid } from './utils';
import Dashboard from './containers/Dashboard';
import Question from './containers/Questions';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(checkIfAccesstokenIsValid());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Redirect path="/" exact to={checkIfAccesstokenIsValid() ? DASHBOARD : LOGIN} />
          <Route path={SIGNUP} exact component={SignUp} />
          {!checkIfAccesstokenIsValid() && (
            <Route path={LOGIN} render={() => <Login setLoggedIn={setLoggedIn} />} />
          )}
          {checkIfAccesstokenIsValid() && (
            <div>
              <Route path={QUESTIONS} exact component={Question} />
              <Route path={DASHBOARD} exact render={() => <Dashboard />} />
            </div>
          )}
          <Redirect path='**' to={checkIfAccesstokenIsValid() ? DASHBOARD : LOGIN} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
