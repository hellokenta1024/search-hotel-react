import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const InnerMap = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.location}
    center={props.location}
  >
    {props.isMarkerShown && <Marker position={props.position} />}
  </GoogleMap>
);

const Map = ({ location }) => (
  <InnerMap
    isMarkerShown={true}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={(<div className='map' />)}
    location={ location }
    position={location}
  />
);

Map.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired
};

export default Map;
