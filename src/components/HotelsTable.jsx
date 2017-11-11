import React from 'react';
import PropTypes from 'prop-types';
import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';
import _ from 'lodash';
import { connect } from 'react-redux';

const HotelsTable = ({ hotels }) => (
  <table>
    <tbody>
      <tr>
        <th>image</th>
        <th>hotel name</th>
        <HotelsClickableTh
          label="price"
          sortKey="price"
        />
        <HotelsClickableTh
          label="review"
          sortKey="reviewAverage"
        />
        <th>review count</th>
        <th>distance</th>
      </tr>
      {hotels.map(hotel => (<HotelRow key={hotel.id} hotel={hotel} />))}
    </tbody>
  </table>
);

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.any),
};

HotelsTable.defaultProps = {
  hotels: [],
};

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

export default connect(
  state => ({
    hotels: sortedHotels(state.hotels, state.sortKey),
  }),
)(HotelsTable);
