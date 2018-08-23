import React, { Component } from 'react';
import User from './User';
import sampleUsers from '../sample-users';

export default class UsersPage extends Component {
  state = {
    sampleUsers,
    category: '',
    sortAsc: false,
    sortDesc: false
  }

  radioFilter = (e) => {
    this.setState({
      category: e.target.value
    });
  }

  render() {
    const { sampleUsers, category } = this.state;
    const featuredUsers = sampleUsers.data.map((user, i) => <User key={i} user={user} />);
    let usersCategory;

    if (category) {
      usersCategory = sampleUsers.data
        .filter(user => user.category === category)
        .map((user, i) => <User key={i} user={user} />);
    }

    return (
      <section className="users-page">
        <header>
          <h1>Users Grid</h1>
          <div className="filters">
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat1" onChange={(e) => this.radioFilter(e)}/>
                Category 1
              </label>
            </div> 
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat2" onChange={(e) => this.radioFilter(e)} />
                Category 2
              </label>
            </div> 
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat3" onChange={(e) => this.radioFilter(e)} />
                Category 3
              </label>
            </div> 
            <div className="filter-radio">
              <label>
                <input type="radio" name="category" value="cat4" onChange={(e) => this.radioFilter(e)} />
                Category 4
              </label>
            </div> 
          </div>
        </header>
        <div className="users-grid">
          {category ? usersCategory : featuredUsers}
        </div>
      </section>
    )
  }
}