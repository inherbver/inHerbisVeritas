import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant de carrousel pour la hero section, inspiré du design Weleda
 * Inclut des transitions fluides, un autoplay, et des contrôles interactifs
 */
const HeroSection = () => {
  // Données du carrousel
  const slides = [
    {
      id: 1,
      image: '/assets/images/hero-1.webp.jpeg',
      title: 'Découvrez nos plantes médicinales',
      subtitle: 'La puissance des plantes méditerranéennes',
      cta: 'Découvrir',
      link: '/shop',
    },
    {
      id: 2,
      image: '/assets/images/hero-2.webp.jpeg',
      title: 'Nos produits 100% naturels',
      subtitle: 'Cultivés et récoltés en France',
      cta: 'Explorer',
      link: '/shop',
    },
    {
      id: 3,
      image: '/assets/images/hero-3.webp.jpeg',
      title: 'Formules traditionnelles',
      subtitle: 'Le savoir-faire ancestral au service de votre bien-être',
      cta: 'En savoir plus',
      link: '/magazine',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideInterval = useRef(null);
  const slidesRef = useRef(null);

  // Fonction pour passer à la slide suivante
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

    // Réinitialiser l'état de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [current, isTransitioning, slides.length]);

  // Fonction pour passer à la slide précédente
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

    // Réinitialiser l'état de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [current, isTransitioning, slides.length]);

  // Gestion de l'autoplay
  useEffect(() => {
    if (isPaused) return;

    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000); // Changer de slide toutes les 5 secondes

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [current, isPaused, nextSlide]);

  // Gestion du hover pour mettre en pause l'autoplay
  const pauseSlideshow = () => setIsPaused(true);
  const resumeSlideshow = () => setIsPaused(false);

  // Gestion des touches clavier pour l'accessibilité
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        slidesRef.current &&
        slidesRef.current.contains(document.activeElement)
      ) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative h-[calc(100vh-4rem)] overflow-hidden"
      onMouseEnter={pauseSlideshow}
      onMouseLeave={resumeSlideshow}
      ref={slidesRef}
      aria-roledescription="carrousel"
      aria-label="Photos et promotions de nos produits phares"
    >
      {/* Container du carrousel */}
      <div className="relative h-full w-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-carousel-slide ${index === current ? 'active' : ''}`}
            aria-hidden={index !== current}
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} sur ${slides.length}`}
          >
            {/* Fond d'image avec effet parallaxe */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transform scale-105 ${
                  index === current ? 'animate-slow-zoom-out' : ''
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Overlay avec dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Contenu de la slide */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pt-16">
              <div
                className={`max-w-3xl mx-auto ${index === current ? 'slide-content-animation' : ''}`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label={`${slide.cta}: ${slide.title}`}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Flèches de navigation */}
        <button
          className="hero-carousel-nav-button left-4 sm:left-6"
          onClick={prevSlide}
          aria-label="Slide précédente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="hero-carousel-nav-button right-4 sm:right-6"
          onClick={nextSlide}
          aria-label="Slide suivante"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicateurs de slide */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-carousel-indicator ${index === current ? 'active' : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrent(index);
                setTimeout(() => setIsTransitioning(false), 600);
              }}
              aria-label={`Aller à la slide ${index + 1}`}
              aria-current={index === current ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
