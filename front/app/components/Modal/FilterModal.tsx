import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button';

interface ModalProps {
  onClose: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilterSelection = (filterName: string) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(prevFilters => prevFilters.filter(filter => filter !== filterName));
    } else {
      setSelectedFilters(prevFilters => [...prevFilters, filterName]);
    }
  };

  const isFilterSelected = (filterName: string) => {
    return selectedFilters.includes(filterName);
  };

  const onSubmit = () => {
    console.log(selectedFilters);
    onClose();
  };

  return (
    <div className="bg-gray-200 h-screen  rounded-r-xl flex flex-col rounded-md">
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
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer ${isFilterSelected("Appartement") ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              onClick={() => toggleFilterSelection("Appartement")}
            >
              Appartement
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer ${isFilterSelected("Hotel") ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              onClick={() => toggleFilterSelection("Hotel")}
            >
              Hotel
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2 cursor-pointer ${isFilterSelected("Musée") ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              onClick={() => toggleFilterSelection("Musée")}
            >
              Musée
            </span>
          </div>
          <Button type="submit" className="bg-[#5739FC] p-3 text-sm text-white rounded-xl mt-4 " onClick={onSubmit}>
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
