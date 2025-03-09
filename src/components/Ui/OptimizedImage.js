import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant pour afficher des images optimisées avec support WebP
 * Ce composant recherche automatiquement les versions .webp et .min des images
 * et charge la version la plus appropriée en fonction du support du navigateur
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  quality = 'high',
  ...props
}) => {
  // Fonctions utilitaires pour générer les chemins des différentes versions
  const getWebpPath = (originalPath) => {
    const pathObj = new URL(originalPath, window.location.origin);
    const fileName = pathObj.pathname.split('/').pop();
    const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const dirPath = pathObj.pathname.substring(
      0,
      pathObj.pathname.lastIndexOf('/') + 1
    );

    // Retourne le chemin WebP
    return `${dirPath}${fileNameWithoutExt}.webp`;
  };

  const getMinPath = (originalPath) => {
    const pathObj = new URL(originalPath, window.location.origin);
    const fileName = pathObj.pathname.split('/').pop();
    const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    const dirPath = pathObj.pathname.substring(
      0,
      pathObj.pathname.lastIndexOf('/') + 1
    );

    // Retourne le chemin vers la version minifiée
    return `${dirPath}${fileNameWithoutExt}.min${ext}`;
  };

  // Chemin de l'image original pour fallback
  const fallbackSrc = src;

  // Chemin vers les versions optimisées
  const webpSrc = getWebpPath(src);
  const minSrc = quality === 'high' ? fallbackSrc : getMinPath(src);

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={minSrc} type={`image/${src.split('.').pop()}`} />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        {...props}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.oneOf(['lazy', 'eager', 'auto']),
  quality: PropTypes.oneOf(['high', 'low']),
};

export default OptimizedImage;
