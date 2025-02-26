import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactInfoCard = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-emerald-800">
        Nous contacter
      </h3>

      <div className="space-y-4 text-gray-600">
        <div className="flex items-start">
          <FaMapMarkerAlt className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Adresse</p>
            <p>123 Rue des Plantes, 34000 Montpellier</p>
          </div>
        </div>

        <div className="flex items-start">
          <FaPhone className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Téléphone</p>
            <p>+33 4 67 XX XX XX</p>
          </div>
        </div>

        <div className="flex items-start">
          <FaEnvelope className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Email</p>
            <p>contact@inherbisveri.tas</p>
          </div>
        </div>

        <div className="flex items-start">
          <FaClock className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Horaires</p>
            <p>Lundi - Vendredi: 9h - 18h</p>
            <p>Samedi: 9h - 12h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
