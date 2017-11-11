import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../containers/SearchForm';
import GeocodeResult from './GeocodeResult';
import axios from 'axios';
import Map from './Map';
import HotelsTable from './HotelsTable';
import { startSearch } from '../actions/'

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class SearchPage extends Component {

  componentDidMount() {
    this.props.dispatch(startSearch());
  }

  render() {

    return(
      <div className="search-page">
        <h1 className="app-title">Hotel Search</h1>
        <SearchForm history={this.props.history} />
        <div className="result-area">
          <Map location={this.props.geocodeResult.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            <h2>Hotels</h2>
            <HotelsTable />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  geocodeResult: state.geocodeResult,
});

//const mapDispatchToProps = (dispatch) => ({

export default connect(mapStateToProps)(SearchPage);
