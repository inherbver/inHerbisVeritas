import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MarketCard = ({ market }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Détection de l'appareil pour adapter le comportement de la carte
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|iPad|iPhone|iPod|tablet|mobile|Tablet/i.test(userAgent)) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Déterminer les coordonnées selon la structure des données
  const lat = market.coordinates
    ? market.coordinates[0]
    : market.position
      ? market.position.lat
      : 43.6047;
  const lng = market.coordinates
    ? market.coordinates[1]
    : market.position
      ? market.position.lng
      : 3.8714;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 h-[110px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
          {market.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaMapMarkerAlt className="text-green-600 mr-2 flex-shrink-0" />
          <span className="truncate">
            {market.address || 'Montpellier, France'}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="text-green-600 mr-2 flex-shrink-0" />
          <span className="truncate">{market.days || 'Tous les samedis'}</span>
        </div>
      </div>
      <div className="relative flex-grow">
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          style={{ height: '180px', width: '100%' }}
          scrollWheelZoom={isMobile} // Activation du zoom à la molette sur mobile
          dragging={true} // Activation de la navigation à la souris/doigt sur toutes les plateformes
          doubleClickZoom={true}
          attributionControl={false}
          zoomControl={false} // Désactive les contrôles de zoom par défaut pour les placer à droite
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[lat, lng]}
            icon={L.icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>{market.name}</Popup>
          </Marker>
        </MapContainer>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-8"></div>
      </div>
      <div className="p-4 pt-3 mt-auto">
        <Link
          to={`/marches/${market.slug || market.id}`}
          className="block w-full text-center text-green-600 hover:text-green-700 border border-green-600 hover:border-green-700 text-sm font-medium py-1.5 px-4 rounded-full transition-colors"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

MarketCard.propTypes = {
  market: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string,
    address: PropTypes.string,
    days: PropTypes.string,
    coordinates: PropTypes.array,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }).isRequired,
};

export default MarketCard;
