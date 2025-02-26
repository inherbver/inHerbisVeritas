import L from 'leaflet';
const markerIcon = '/assets/map/marker-icon.png';
const markerShadow = '/assets/map/marker-shadow.png';

export const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
