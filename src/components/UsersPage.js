import React, { Component } from 'react';
import User from './User';
import sampleUsers from '../sample-users';

export default class UsersPage extends Component {
  state = {
    sampleUsers
  }

  render() {
    const { sampleUsers } = this.state;

    return (
      <section className="users-page">
        <header>
          <h1>Users Grid</h1>
          <div className="filters">

          </div>
        </header>
        <div className="users-grid">
          {sampleUsers.data.map((user, i) => <User key={i} user={user} />)}
        </div>
      </section>
    )
  }
}