import MarketCard from './MarketCard';
import PropTypes from 'prop-types';

const ContactGrid = ({ markets }) => (
  <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-6 lg:grid-cols-3">
    {markets.map((market) => (
      <MarketCard key={market.name} market={market} />
    ))}
  </div>
);

ContactGrid.propTypes = {
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      days: PropTypes.string.isRequired,
      hours: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default ContactGrid;
