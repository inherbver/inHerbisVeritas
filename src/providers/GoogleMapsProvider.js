import { LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const LIBRARIES = ['marker'];

export default function GoogleMapsProvider({ children }) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
      version="beta"
      loadingElement={<div>Chargement des cartes...</div>}
    >
      {children}
    </LoadScript>
  );
}

GoogleMapsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
