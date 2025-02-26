import React from 'react';
import PropTypes from 'prop-types';

const socialMediaLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/in.herbis.veritas',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/in_herbis_veritas',
  },
];

const SocialMediaLinks = ({ className, links = socialMediaLinks }) => (
  <aside
    className={`${className} bg-white p-6 rounded-lg shadow-md flex-1`}
    aria-label="Réseaux sociaux"
  >
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nous suivre</h2>
    <div className="flex gap-6">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="hover:opacity-75 transition-opacity"
        >
          <img
            src={`/assets/images/${link.name.toLowerCase()}.png`}
            alt=""
            role="presentation"
            width="40"
            height="40"
          />
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
    })
  ),
};

export default SocialMediaLinks;
