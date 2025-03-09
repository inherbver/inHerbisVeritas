import PropTypes from 'prop-types';
import MarketCard from './MarketCard';

const ContactGrid = ({ markets = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
      {markets.map((market) => (
        <div key={`${market.name}-${market.id}`} className="h-full">
          <MarketCard market={market} />
        </div>
      ))}
    </div>
  );
};

ContactGrid.propTypes = {
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      coordinates: PropTypes.array,
    })
  ),
};

export default ContactGrid;
