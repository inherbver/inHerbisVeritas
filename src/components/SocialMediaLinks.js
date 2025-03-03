import React from 'react';
import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaShareAlt,
} from 'react-icons/fa';

const socialMediaLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/in.herbis.veritas',
    icon: FaFacebook,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/in_herbis_veritas',
    icon: FaInstagram,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: FaTwitter,
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: FaPinterest,
    color: 'bg-red-100 text-red-600',
  },
];

const SocialMediaLinks = ({ className, links = socialMediaLinks }) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${className}`}
  >
    <div className="mb-6 flex items-center border-b pb-3 border-gray-100">
      <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4">
        <FaShareAlt size={18} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Nous suivre</h2>
    </div>

    <p className="mb-6 text-gray-600">
      Restez connectés avec nous sur les réseaux sociaux pour découvrir nos
      dernières actualités, événements et promotions.
    </p>

    <div className="grid grid-cols-2 gap-4 mb-6">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center p-3 rounded-lg hover:bg-opacity-80 transition-colors ${link.color}`}
          aria-label={link.name}
        >
          <link.icon size={20} className="mr-3" />
          <span className="font-medium">{link.name}</span>
        </a>
      ))}
    </div>

    <div className="mt-auto pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-500 text-center mb-2">
        Partagez votre expérience avec nous
      </p>
      <div className="flex justify-center gap-4">
        {links.map((link) => (
          <a
            key={`small-${link.name}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
            aria-label={link.name}
          >
            <link.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

SocialMediaLinks.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      color: PropTypes.string,
    })
  ),
};

export default SocialMediaLinks;
