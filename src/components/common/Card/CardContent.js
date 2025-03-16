import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant pour le contenu principal d'une carte
 */
const CardContent = ({
  children,
  className = '',
  padding = 'p-5',
  flex = true,
  grow = true,
}) => {
  const flexClasses = flex ? 'flex flex-col' : '';
  const growClasses = grow ? 'flex-grow' : '';

  return (
    <div className={`${padding} ${flexClasses} ${growClasses} ${className}`}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  flex: PropTypes.bool,
  grow: PropTypes.bool,
};

export default CardContent;
