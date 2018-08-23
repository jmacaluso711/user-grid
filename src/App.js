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
    isValid: {},
    errors: {}
  }

  storeSession = () => {
    const timestamp = Date.now();
    sessionStorage.setItem('session', timestamp);
  }

  login = () => {
    
    let formData = {
      email: this.email.value,
      password: this.password.value,
    };

    if (formData.email === testUser.email && formData.password === testUser.password) {
      this.storeSession();
      testAuth.authenticate(() => {
        this.setState({
          redirectToUsers: true
        })
      })
    } else {
      const errors = this.state.errors;
      errors.accessDenied = true;
      this.setState({
        errors
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.login();
  }

  render() {

    const { redirectToUsers, errors } = this.state;

    const denied = (
      <div>Access Denied</div>
    );

    const form = (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={(input) => this.email = input}
            type="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            ref={(input) => this.password = input}
            type="password"
            name="password"
            pattern=".{10,}"
            required
          />
        </div>
        <button>Login</button>
      </form>
    )

    if (redirectToUsers === true) {
      return <Redirect to='/users' />
    }

    return (
      <div>
        <h1>Login</h1>
        {errors.accessDenied ? denied : null}
        {form}
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
