import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { testAuth } from './config';
import UsersPage from  './components/UsersPage';
import Login from './components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    testAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

class App extends Component {
  componentWillMount() {
    const session = sessionStorage.getItem('session');
    if(session) {
      testAuth.authenticate(() => {
        this.setState({
          redirectToUsers: true
        })
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/users" component={UsersPage} />
        </div>
      </Router>
    );
  }
}

export default App;
