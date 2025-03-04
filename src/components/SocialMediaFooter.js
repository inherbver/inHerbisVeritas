import React from 'react';
import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from 'react-icons/fa';

const defaultSocialMediaLinks = [
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

const SocialMediaFooter = ({ className, links = defaultSocialMediaLinks }) => (
  <div className={`${className}`}>
    <p className="text-sm text-gray-300 mb-2">
      Partagez votre expérience avec nous
    </p>
    <div className="flex gap-4">
      {links.map((link) => (
        <a
          key={`footer-${link.name}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          aria-label={link.name}
        >
          <link.icon size={18} />
        </a>
      ))}
    </div>
  </div>
);

SocialMediaFooter.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default SocialMediaFooter;
