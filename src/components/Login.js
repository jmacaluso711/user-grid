import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { testUser, testAuth } from '../config';

export default class Login extends Component {
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

    if (formData.email !== testUser.email || formData.password !== testUser.password) {
      isError = true;
      errors.accessError = 'Access Denied';
    } else {
      errors.accessError = '';
    }

    console.log(errors);

    if (isError) {
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

    if (!error) {
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