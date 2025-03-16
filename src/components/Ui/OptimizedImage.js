import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant OptimizedImage modernisé avec support des formats next-gen
 * et intégration améliorée avec votre configuration CRACO existante
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  sizes = '100vw',
  onError,
  ...props
}) => {
  const [imgError, setImgError] = useState(false);
  const [avifError, setAvifError] = useState(false);
  const [webpError, setWebpError] = useState(false);
  const fallbackImage = '/assets/images/placeholder.jpg';
  
  // Vérification et normalisation du chemin source
  const safeImageSrc = src || fallbackImage;
  
  // Génération des chemins pour les formats modernes
  const getOptimizedPath = (path, format) => {
    if (!path || typeof path !== 'string') return null;
    
    // Ne pas modifier les URLs externes
    if (path.startsWith('http')) return null;
    
    // Vérifier si l'image a une extension compatible
    const validExtRegex = /\.(jpe?g|png|gif)$/i;
    if (!validExtRegex.test(path)) return null;
    
    // Générer le chemin du format spécifié
    try {
      return path.replace(validExtRegex, `.${format}`);
    } catch (error) {
      return null;
    }
  };
  
  // Chemins vers les formats optimisés
  const webpSrc = getOptimizedPath(safeImageSrc, 'webp');
  const avifSrc = getOptimizedPath(safeImageSrc, 'avif');
  
  // Gestionnaires d'erreur pour chaque format
  const handleAvifError = () => setAvifError(true);
  const handleWebpError = () => setWebpError(true);
  
  // Gestionnaire d'erreur principal pour l'image de fallback
  const handleImageError = (e) => {
    if (!imgError) {
      setImgError(true);
      e.target.onerror = null;
      e.target.src = fallbackImage;
      
      if (typeof onError === 'function') {
        onError(e);
      }
    }
  };

  return (
    <picture>
      {/* AVIF - Format le plus optimisé mais support limité */}
      {!imgError && avifSrc && !avifError && (
        <source 
          srcSet={avifSrc} 
          type="image/avif" 
          sizes={sizes}
          onError={handleAvifError} 
        />
      )}
      
      {/* WebP - Format bien supporté et efficace */}
      {!imgError && webpSrc && !webpError && (
        <source 
          srcSet={webpSrc} 
          type="image/webp" 
          sizes={sizes}
          onError={handleWebpError} 
        />
      )}
      
      {/* Image originale comme fallback ultime */}
      <img 
        src={safeImageSrc}
        alt={alt || ''}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={handleImageError}
        {...props}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.oneOf(['lazy', 'eager', 'auto']),
  sizes: PropTypes.string,
  onError: PropTypes.func
};

export default OptimizedImage;
