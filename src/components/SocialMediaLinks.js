import React from 'react';
import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from 'react-icons/fa';

const socialMediaLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/in.herbis.veritas',
    icon: FaFacebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/in_herbis_veritas',
    icon: FaInstagram,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: FaTwitter,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: FaPinterest,
  },
];

const SocialMediaLinks = ({ className, links = socialMediaLinks }) => (
  <aside
    className={`${className} bg-white p-6 rounded-lg shadow-md flex-1`}
    aria-label="Réseaux sociaux"
  >
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nous suivre</h2>
    <p className="mb-4 text-gray-600">
      Restez connectés avec nous sur les réseaux sociaux pour découvrir nos
      dernières actualités, événements et promotions.
    </p>
    <div className="flex flex-wrap gap-4 mt-auto">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
          aria-label={link.name}
        >
          <link.icon size={20} />
        </a>
      ))}
    </div>
  </aside>
);

SocialMediaLinks.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default SocialMediaLinks;
