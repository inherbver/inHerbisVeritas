import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactInfoCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 border-gray-100">
        Nous contacter
      </h3>

      <div className="space-y-6 text-gray-600">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
            <FaMapMarkerAlt size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Adresse</p>
            <p className="text-gray-600">
              123 Rue des Plantes, 34000 Montpellier
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
            <FaPhone size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Téléphone</p>
            <p className="text-gray-600">+33 4 67 XX XX XX</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
            <FaEnvelope size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Email</p>
            <p className="text-gray-600">contact@inherbisveri.tas</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
            <FaClock size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Horaires</p>
            <p className="text-gray-600">Lundi - Vendredi: 9h - 18h</p>
            <p className="text-gray-600">Samedi: 9h - 12h</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-full transition-all duration-300 transform active:scale-95">
          Nous écrire
        </button>
      </div>
    </div>
  );
};

export default ContactInfoCard;
