import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './containers/Signup';
import Login from './containers/Login';
import Header from './components/Header';
import { LOGIN, SIGNUP, PROFILE, QUESTIONS } from './constants/routes';
import { checkIfAccesstokenIsValid } from './utils';
import Dashboard from './containers/Dashboard';
import Question from './containers/Questions';
import { rootState } from './store';
import { showLoading, hideLoading } from './reducers/loaderSlice';
import Loader from './components/Loader';
type AppProps = {
  isLoading: boolean,
  showLoading: () => void,
  hideLoading: () => void,
}

const App: React.FC<AppProps> = ({ isLoading, showLoading, hideLoading  }):JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(checkIfAccesstokenIsValid());
  }, []);

  return (
    <div className="App">
      {/* <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> */}
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Redirect path="/" exact to={checkIfAccesstokenIsValid() ? PROFILE : LOGIN} />
          <Route path={SIGNUP} exact component={SignUp} />
          {!checkIfAccesstokenIsValid() && (
            <Route path={LOGIN} render={() => <Login setLoggedIn={setLoggedIn} />} />
          )}
          {checkIfAccesstokenIsValid() && (
            <div>
              <Route path={QUESTIONS} exact component={Question} />
              <Route path={PROFILE} exact render={() => <Dashboard />} />
            </div>
          )}
          <Redirect path='**' to={checkIfAccesstokenIsValid() ? PROFILE : LOGIN} />
        </Switch>
      </BrowserRouter>
      {isLoading && <Loader />}
    </div>
  );
}

const mapStateToProps = (state: rootState) => ({
  isLoading: state.loader.loading
})

export default connect(
  mapStateToProps,
  { showLoading, hideLoading }
)(App);
