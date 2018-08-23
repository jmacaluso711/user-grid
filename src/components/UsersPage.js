import React, { Component } from 'react';
import User from './User';
import sampleUsers from '../sample-users';

export default class UsersPage extends Component {
  state = {
    users: sampleUsers,
    category: '',
  }

  filterBy = (e) => {
    this.setState({
      category: e.target.value
    });
  }

  sortBy = (e) => {
    let users = Object.assign({}, this.state.users);
    let sortedUsers;

    switch(e.target.value) {
      case 'asc':
        sortedUsers = users.data.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        break;
      case 'desc':
        sortedUsers = users.data.sort((a, b) => {
          return a.name > b.name ? -1 : 1;
        });
        break;
      case 'priority':
        sortedUsers = users.data.sort((a, b) => {
          return a.priority > b.priority ? 1 : -1;
        })
        break;
      case 'featured':
        sortedUsers = users.data;
        break;
      default:
        return null;
    }

    users.data = sortedUsers;
    this.setState({users});
  }

  render() {
    const { category, users } = this.state;
    const featuredUsers = users.data.map((user, i) => <User key={i} user={user} />);
    let userList = featuredUsers;

    if (category) {
      const usersCategory = users.data.filter(user => user.category === category);
      userList = usersCategory.map((user, i) => <User key={i} user={user} />);;
    }

    return (
      <section className="users-page">
        <header>
          <h1>Users Grid</h1>
          <div className="filters">
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat1" onChange={(e) => this.filterBy(e)}/>
                Category 1
              </label>
            </div> 
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat2" onChange={(e) => this.filterBy(e)} />
                Category 2
              </label>
            </div> 
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat3" onChange={(e) => this.filterBy(e)} />
                Category 3
              </label>
            </div>
          </div>
          <div className="sorts">
            <select onChange={(e) => this.sortBy(e)}> 
              <option value="featured">Featured</option>
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </header>
        <div className="users-grid">
          {userList}
        </div>
      </section>
    )
  }
}