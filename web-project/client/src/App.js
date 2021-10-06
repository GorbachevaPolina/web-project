import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/LogIn';
import Register from './components/Register';
import MainPage from './components/MainPage';
import Menu from './components/Menu';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/is-verify', {
          method: 'GET',
          headers: {token: localStorage.token}
        }
      )

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Fragment>
      <Router>
        
          <Switch>
            <Route 
              exact
              path='/'
              render={props => <MainPage {...props} isAuth={isAuthenticated} setAuth={setAuth}/>}
            />
            <Route 
              exact 
              path='/login' 
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to='/dashboard' /> 
                )
              }
            />
            <Route 
              exact 
              path='/register' 
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to='/login' /> 
                )
              }
            />
            <Route 
              exact 
              path='/dashboard' 
              render={props => 
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to='/login' /> 
                )
              }
            />
            <Route 
              exact
              path='/menu'
              render={props => <Menu {...props} isAuth={isAuthenticated}/>}
            />
          </Switch>
        
      </Router>
    </Fragment>
  );
}

export default App;
