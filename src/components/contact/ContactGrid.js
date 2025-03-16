import PropTypes from 'prop-types';
import MarketCard from './MarketCard';
import Grid from '../common/Grid';

const ContactGrid = ({ markets = [] }) => {
  // Limiter l'affichage aux 4 premières cartes
  const limitedMarkets = markets.slice(0, 4);
  
  return (
    <Grid 
      cols={{ default: 1, sm: 2, lg: 4 }} 
      gap={6} 
      className="items-stretch"
      as="section"
    >
      {limitedMarkets.map((market) => (
        <div key={`${market.name}-${market.id}`} className="h-full">
          <MarketCard market={market} />
        </div>
      ))}
    </Grid>
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
