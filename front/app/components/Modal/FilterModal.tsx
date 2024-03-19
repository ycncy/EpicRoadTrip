import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  onClose: () => void;
}

const SortModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md z-10">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="mt-4">
          {/* Contenu de la modal */}
          <h2 className="text-lg font-semibold mb-2">Filtres</h2>
          <p>Ajoutez ici vos filtres...</p>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
