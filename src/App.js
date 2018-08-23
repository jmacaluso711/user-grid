import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import sampleUsers from './sample-users';

const testUser = {
  email: "test@zola.com",
  password: "zola#frontend"
}

const testAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    testAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

const User = ({ user }) => (
  <div className={"user " + user.category}>
    <h2 className="user-title">{user.name}</h2>
    <span class="user-age">Age: {user.age}</span>
    <span class="user-cat">Category: {user.category}</span>
  </div>
)

class UsersPage extends Component {
  state = {
    sampleUsers
  }

  render() {
    const { sampleUsers } = this.state;
    return (
      <section class="users-page">
        <header>
          <h1>Users Grid</h1>
          <div className="filters">
            
          </div>
        </header>
        <div className="users-grid">
          {sampleUsers.data.map((user, i) => <User key={i} user={user}/>)}
        </div>
      </section>
    )
  }
}

class Login extends Component {
  state = {
    redirectToUsers: false,
    emailError: '',
    passwordError: '',
    accessError: ''
  }

  storeSession = () => {
    const timestamp = Date.now();
    sessionStorage.setItem('session', timestamp);
  }

  validate = (formData) => {
    let isError = false;
    const errors = {};
    const passwordRegex = new RegExp(/^.*(?=.{10,})(?=.*[a-z])(?=.*[!@#$%^&*-]).*/);

    if (formData.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Email must contain @ symbol.';
    } else {
      errors.emailError = '';
    }

    if (!formData.password.match(passwordRegex)) {
      isError = true;
      errors.passwordError = 'Password must be at least 10 characters and contain 1 special character.'
    } else {
      errors.passwordError = '';
    }

    if (formData.email !== testUser.email && formData.password !== testUser.password) {
      isError = true;
      errors.accessError = 'Access Denied';
    } else {
      errors.accessError = '';
    }

    if(isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }

    return isError;
  }

  login = (e) => {
    e.preventDefault();
    let formData = {
      email: this.email.value,
      password: this.password.value,
    };
    const error = this.validate(formData);

    if(!error) {
      if (formData.email === testUser.email && formData.password === testUser.password) {
        this.storeSession();
        testAuth.authenticate(() => {
          this.setState({
            redirectToUsers: true
          })
        })
      }
      this.setState({
        emailError: '',
        passwordError: '',
        accessError: ''
      });
    }
  }

  render() {

    const { redirectToUsers, emailError, passwordError, accessError } = this.state;

    if (redirectToUsers === true) {
      return <Redirect to='/users' />
    }

    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Login</h1>
          {accessError ? <span className="form-error form-error--access">{accessError}</span> : null}
          <form onSubmit={(e) => this.login(e)} noValidate>
            <div className={emailError ? "form-group form-group--error" : "form-group"}>
              <label htmlFor="email">Email</label>
              <input
                ref={(input) => this.email = input}
                type="email"
                name="email"
              />
              {emailError ? <span className="form-error">{emailError}</span> : null}
            </div>
            <div className={passwordError ? "form-group form-group--error" : "form-group"}>
              <label htmlFor="password">Password</label>
              <input
                ref={(input) => this.password = input}
                type="password"
                name="password"
              />
              {passwordError ? <span className="form-error">{passwordError}</span> : null}
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

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
