import PropTypes from 'prop-types';
import MarketCard from './MarketCard';

const ContactGrid = ({ markets = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {markets.map((market) => (
        <MarketCard key={`${market.name}-${market.id}`} market={market} />
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
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
};

export default ContactGrid;
