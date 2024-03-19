import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  onClose: () => void;
}

const SortModal: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilterSelection = (filterName: string) => {
    setSelectedFilters(prevFilters => {
      if (prevFilters.includes(filterName)) {
        return prevFilters.filter(filter => filter !== filterName);
      } else {
        return [...prevFilters, filterName];
      }
    });
};
console.log(selectedFilters);
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
          <h2 className="text-lg font-semibold mb-2">Filtres</h2>
          <div className="mt-4">
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input id="Appartement" type="checkbox" value="Appartement" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={() => toggleFilterSelection("Appartement")} checked={selectedFilters.includes("Appartement")} />
                <label htmlFor="Appartement" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Appartement </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input id="Hotel" type="checkbox" value="Hotel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={() => toggleFilterSelection("Hotel")} checked={selectedFilters.includes("Hotel")} />
                <label htmlFor="Hotel" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hotel </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input id="Musée" type="checkbox" value="Musée" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={() => toggleFilterSelection("Musée")} checked={selectedFilters.includes("Musée")} />
                <label htmlFor="Musée" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Musée </label>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
