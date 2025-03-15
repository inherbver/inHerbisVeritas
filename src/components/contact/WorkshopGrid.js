import React from 'react';
import PropTypes from 'prop-types';
import WorkshopCard from './WorkshopCard';

/**
 * Grille pour afficher les ateliers et balades
 */
const WorkshopGrid = ({ workshops = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {workshops.map((workshop) => (
        <div key={`${workshop.name}-${workshop.id}`} className="h-full">
          <WorkshopCard workshop={workshop} />
        </div>
      ))}
    </div>
  );
};

WorkshopGrid.propTypes = {
  workshops: PropTypes.array
};

export default WorkshopGrid;
