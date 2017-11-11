import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { searchHotelByLocation } from '../domain/HotelRepository';
import { setPlace, startSearch } from '../actions/';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.history.push(`/?place=${props.place}`);
      props.startSearch();
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.setPlace(e.target.value)
      }}
    />
    <input className="submit-button" type="submit" value="Search" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  startSearch: PropTypes.func.isRequired,
  setPlace: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
}

const mapStateToProps = (state) => ({
  place: state.place,
});

export default connect(
  mapStateToProps,
  { setPlace, startSearch },
)(SearchForm);
