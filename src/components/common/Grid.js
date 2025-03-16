import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Grid réutilisable pour créer des layouts en grille responsives
 * Permet d'utiliser des balises sémantiques HTML5 via la prop "as"
 */
const Grid = ({
  children,
  cols = { default: 1, sm: null, md: null, lg: null },
  gap = 6,
  className = "",
  itemClassName = "",
  as: Component = "div" // Utilisation de balises sémantiques HTML5
}) => {
  // Mapping pour les classes de colonnes supportées par Tailwind
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };
  
  const smColMap = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  };
  
  const mdColMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  };
  
  const lgColMap = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  };
  
  // Mapping pour gap
  const gapMap = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };
  
  // Utiliser les classes mappées directement plutôt que des chaînes dynamiques
  const gridClasses = [
    'grid',
    colMap[cols.default] || 'grid-cols-1',
    cols.sm ? smColMap[cols.sm] : '',
    cols.md ? mdColMap[cols.md] : '',
    cols.lg ? lgColMap[cols.lg] : '',
    gapMap[gap] || 'gap-6',
    className
  ].filter(Boolean).join(' ');

  // Wrapper les enfants avec une classe spécifique si nécessaire
  const renderChildren = () => {
    if (!itemClassName) return children;
    
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      // Fusionner les classes existantes avec itemClassName
      return React.cloneElement(child, {
        className: `${child.props.className || ''} ${itemClassName}`.trim()
      });
    });
  };

  return (
    <Component className={gridClasses}>
      {renderChildren()}
    </Component>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.shape({
    default: PropTypes.number.isRequired,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  }),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  as: PropTypes.elementType
};

export default Grid;
