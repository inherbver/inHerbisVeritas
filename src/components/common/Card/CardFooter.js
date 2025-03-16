import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant pour le pied de carte (boutons, actions, etc.)
 */
const CardFooter = ({
  children,
  className = '',
  bordered = true,
  padding = 'px-5 py-3',
  background = '',
}) => {
  return (
    <footer className={`
      mt-auto 
      ${padding} 
      ${bordered ? 'border-t border-gray-100' : ''} 
      ${background} 
      ${className}
    `}>
      {children}
    </footer>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  padding: PropTypes.string,
  background: PropTypes.string,
};

export default CardFooter;
