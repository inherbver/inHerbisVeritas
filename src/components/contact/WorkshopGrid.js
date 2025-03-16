import React from 'react';
import PropTypes from 'prop-types';
import WorkshopCard from './WorkshopCard';
import Grid from '../common/Grid';

/**
 * Grille pour afficher les ateliers et balades
 * Utilise le composant Grid réutilisable avec une balise sémantique section
 */
const WorkshopGrid = ({ workshops = [] }) => {
  return (
    <Grid 
      cols={{ default: 1, sm: 2, lg: 3 }} 
      gap={6} 
      className="items-stretch"
      as="section"
    >
      {workshops.map((workshop) => (
        <div key={`${workshop.name}-${workshop.id}`} className="h-full">
          <WorkshopCard workshop={workshop} />
        </div>
      ))}
    </Grid>
  );
};

WorkshopGrid.propTypes = {
  workshops: PropTypes.array
};

export default WorkshopGrid;
