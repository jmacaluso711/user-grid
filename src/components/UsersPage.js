import React, { Component } from 'react';
import User from './User';
import sampleUsers from '../sample-users';
import Filters from './Filters';
import Sorts from './Sorts';

export default class UsersPage extends Component {
  state = {
    users: sampleUsers,
    category: '',
  }

  sortBy = (e) => {
    // Make a copy of state
    let users = [...this.state.users.data];
    let sortedUsers = [];

    switch(e.target.value) {
      case 'asc':
        sortedUsers.data = users.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        break;
      case 'desc':
        sortedUsers.data = users.sort((a, b) => {
          return a.name > b.name ? -1 : 1;
        });
        break;
      case 'priority':
        sortedUsers.data = users.sort((a, b) => {
          return a.priority > b.priority ? 1 : -1;
        })
        break;
      case 'featured':
        sortedUsers.data = sampleUsers.data;
        break;
      default:
        return null;
    }

    this.setState({ 
      users: sortedUsers 
    });
  }

  filterBy = (e) => {
    this.setState({
      category: e.target.value
    });
  }

  render() {
    const { users, category } = this.state;
    let userList = users.data.map((user, i) => <User key={i} user={user} />);

    if (category) {
      const usersCategory = users.data.filter(user => user.category === category);
      userList = usersCategory.map((user, i) => <User key={i} user={user} />);
    }

    return (
      <section className="users-page">
        <header>
          <h1>Users Grid</h1>
          <div className="filter-and-sort">
            <Filters filterBy={(e) => this.filterBy(e)} />
            <Sorts sortBy={(e) => this.sortBy(e)} />
          </div>
        </header>
        <div className="users-grid">
          {userList}
        </div>
      </section>
    )
  }
}