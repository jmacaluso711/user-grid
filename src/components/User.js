import React from 'react';

const User = ({ user }) => (
  <div className={"user user-priority--" + user.priority}>
    <h2 className="user-title">{user.name}</h2>
    <span className="user-age">Age: {user.age}</span>
    <span className="user-cat">Category: {user.category}</span>
  </div>
)

export default User;