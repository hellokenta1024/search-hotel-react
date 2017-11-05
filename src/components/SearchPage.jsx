import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import axios from 'axios';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey])

class SearchPage extends Component {

  constructor(props) {

      super(props);

      this.state = {
        location: {
          lat: 35,
          lng: 139,
        },
        sortKey: 'price',
        place: this.getPlaceParam() || 'Tokyo tower',
      };
  }

  componentDidMount() {

    const place = this.getPlaceParam();

    if (place) {
      this.startSearch();
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;

    if (place && place.length > 0) {
      return place;
    }

    return null;
  }

  setErrorMessage(message) {
    console.log(message);
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    })
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  handlePlaceChange(place) {
    this.setState({ place });
  }

  startSearch() {

    geocode(this.state.place)
      .then(({status, address, location}) => {
        console.log("success");
        console.log(status);
        switch (status) {
          case 'OK': {
            this.setState({
              address,
              location,
            });
            return searchHotelByLocation(location);
          }

          case 'ZERO_RESULTS': {
            this.setErrorMessage('error');
            break;
          }

          default: {
            this.setErrorMessage('error desu');
            break;
          }
        }
        return [];
      })
      .then((hotels) => {
        console.log(hotels);
        this.setState({
          hotels: sortedHotels(hotels, this.state.sortKey),
        });
      })
      .catch(() => {
        this.setErrorMessage('network');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return(
      <div className="search-page">
        <h1 className="app-title">Hotel Search</h1>
        <SearchForm
          onSubmit={ (e) => this.handlePlaceSubmit(e)}
          onPlaceChange={ place => this.handlePlaceChange(place) }
          place={this.state.place}
        />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>Hotels</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
}

export default SearchPage;
