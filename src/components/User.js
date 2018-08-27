import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className={"user user-priority--" + user.priority}>
    <h2 className="user-title">{user.name}</h2>
    <span className="user-age">Age: {user.age}</span>
    <span className="user-cat">Category: {user.category}</span>
  </div>
)

export default User;

User.propTypes = {
  user: PropTypes.shape({
    priority: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
}