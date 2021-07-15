import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import Header from './components/Header';
import { LOGIN, SIGNUP, DASHBOARD } from './constants/routes';
import { checkIfAccesstokenIsValid } from './utils';
import Dashboard from './containers/Dashboard';

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
          {!checkIfAccesstokenIsValid() && (
            <Route path={LOGIN} render={() => <Login setLoggedIn={setLoggedIn} />} />
          )}
          <Route path={SIGNUP} exact component={SignUp} />
          <Route path={DASHBOARD} exact render={() => <Dashboard />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
