import React from 'react';

const Filters = ({ filterBy }) => (
  <div className="filters">
    <div className="filter-radio">
      <input id="cat1" type="radio" name="category" value="cat1" onChange={filterBy} />
      <label htmlFor="cat1">
        Category 1
      </label>
    </div>
    <div className="filter-radio">
      <input id="cat2" type="radio" name="category" value="cat2" onChange={filterBy} />
      <label htmlFor="cat2">
        Category 2
      </label>
    </div>
    <div className="filter-radio">
      <input id="cat3" type="radio" name="category" value="cat3" onChange={filterBy} />
      <label htmlFor="cat3">
        Category 3
      </label>
    </div>
  </div>
);

export default Filters;