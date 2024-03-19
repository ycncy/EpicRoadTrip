import { faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import PointOfInterest from './PointOfInterest';
import SortModal from './Modal/FilterModal';

const TabPointOfInterest = () => {
    const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    
    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true);
      };
    
      const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
      };
      const handleSortChange = (event: any) => {
        const selectedSortOption = event.target.value;
      };

      useEffect(() => {
        fetch('')
            .then(response => response.json())
            .then(data => setPointsOfInterest(data))
            .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
    }, []);

  return (
    <div >
    <div className="flex justify-center mb-4">
       <button onClick={handleOpenFilterModal} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-14">
         <FontAwesomeIcon icon={faBars} className='mr-2' />
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

     <ul>
        {pointsOfInterest.map((index) => (
        <li className='mb-10'>
            <PointOfInterest key={index}/> 
        </li>
     
        ))}
    </ul>

 </div>
  )
}

export default TabPointOfInterest;