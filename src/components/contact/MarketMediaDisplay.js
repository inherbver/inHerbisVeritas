import React, { useState, useEffect } from 'react';
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
import { FaMapMarkedAlt } from 'react-icons/fa';

/**
 * Composant qui affiche soit une carte soit une photo d'un marché, avec des miniatures pour alterner
 * Basé sur la structure de ProductGallery de la page ProductDetails
 */
const MarketMediaDisplay = ({ market }) => {
  const [mediaType, setMediaType] = useState('map');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
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
    <div className="space-y-4">
      {/* Affichage principal : carte ou photo */}
      <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-xl overflow-hidden shadow-md">
        {mediaType === 'map' ? (
          <MapContainer
            center={[lat, lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={isMobile}
            dragging={true}
            doubleClickZoom={true}
            attributionControl={false}
            zoomControl={false}
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
        ) : market.photos && market.photos.length > 0 ? (
          <img
            src={market.photos[selectedPhotoIndex].url}
            alt={market.photos[selectedPhotoIndex].alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            Aucune photo disponible
          </div>
        )}
      </div>

      {/* Miniatures pour naviguer entre carte et photos */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {/* Miniature de la carte */}
        <button
          onClick={() => setMediaType('map')}
          className={`h-16 w-16 rounded-md border-2 overflow-hidden ${
            mediaType === 'map'
              ? 'border-green-500'
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <div className="h-full w-full bg-blue-100 flex items-center justify-center">
            <FaMapMarkedAlt className="text-blue-500" size={24} />
          </div>
        </button>

        {/* Miniatures des photos */}
        {market.photos &&
          market.photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => {
                setMediaType('photo');
                setSelectedPhotoIndex(i);
              }}
              className={`h-16 w-16 rounded-md border-2 overflow-hidden ${
                mediaType === 'photo' && i === selectedPhotoIndex
                  ? 'border-green-500'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.alt || `Photo du marché ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
      </div>
    </div>
  );
};

MarketMediaDisplay.propTypes = {
  market: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.array,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default MarketMediaDisplay;
