import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { customIcon } from '../utils/mapIcons';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

export default function MarketCard({ market, className }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-72 md:h-80 hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">{market.name}</h3>
        <p className="text-gray-600 mt-1 text-sm line-clamp-2">
          {market.address}
        </p>
      </div>

      <div className="h-[calc(100%-80px)] relative border border-gray-100">
        <MapContainer
          center={market.coordinates}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
          doubleClickZoom={false}
          className="h-full w-full"
          touchZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={market.coordinates} icon={customIcon}>
            <Popup className="font-medium text-sm">{market.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

MarketCard.propTypes = {
  market: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  className: PropTypes.string,
};
