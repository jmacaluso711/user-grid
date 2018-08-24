import React from 'react';

const Sorts = ({ sortBy }) => (
  <div className="sorts">
    <select onChange={sortBy}>
      <option value="featured">Featured</option>
      <option value="asc">Sort A-Z</option>
      <option value="desc">Sort Z-A</option>
      <option value="priority">Sort by Priority</option>
    </select>
  </div>
);

export default Sorts;