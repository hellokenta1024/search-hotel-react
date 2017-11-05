import React, { PropTypes } from 'react';

const SearchForm = props => (
  <form className="search-form" onSubmit={e => props.onSubmit(e)}>
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={e => props.onPlaceChange(e.target.value)}
    />
    <input className="submit-button" type="submit" value="Search" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
}

export default SearchForm;
