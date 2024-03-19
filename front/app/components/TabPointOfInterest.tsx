import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import PointOfInterest from './PointOfInterest';
import SortModal from './Modal/FilterModal';

const TabPointOfInterest = () => {
    const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
    const PointsOfInterest = ['aa', 'bb', 'cc'];
    
    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true);
      };
    
      const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
      };
      const handleSortChange = (event: any) => {
        const selectedSortOption = event.target.value;
      };
  return (
    <div >
    <div className="flex justify-center mb-4">
       <button onClick={handleOpenFilterModal} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-14">
         <FontAwesomeIcon icon={faFilter} className='mr-2' />
         Filtrer
       </button>

            <select id="sort" name="sort"  className="px-2 py-1 bg-blue-500 text-white rounded-md" onChange={handleSortChange}>
            <option selected>Trier</option>
            <option value="option1">Par distance</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            </select>
   
     </div>
     <div className="p-4">
          {isSortModalOpen && <SortModal onClose={handleCloseFilterModal} />}
        </div>
        <ul>
      </ul>
   <PointOfInterest />


 </div>
  )
}

export default TabPointOfInterest;