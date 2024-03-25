import { faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import PointOfInterest from './PointOfInterest';
import SortModal from './Modal/FilterModal';

const TabPointOfInterest = () => {
    const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
    const [pointsOfInterest, setPointsOfInterest] =  useState([]);

    const point = {
      id: '1',
      title: 'Point d\'Intérét',
      position: 'marseille',
      Image:''
    }
    
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
        fetch("https://data.datatourisme.gouv.fr/10/000ce9fa-eaca-3d78-a395-8798b5965cbc")
          .then((response) => response.json())
          .then((data) => setPointsOfInterest(data));
    }, [])

  return (
    <div >
    <div className="flex justify-center mb-4">
       <button onClick={handleOpenFilterModal} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-14">
         <FontAwesomeIcon icon={faBars} className='mr-2' />
         Filtrer
       </button>

            <select id="sort" name="sort"  className="px-2 py-1 bg-blue-500 text-white rounded-md" onChange={handleSortChange}>
            <option selected>Trier</option>
            <option value="option1">Les plus proches </option>
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
    {pointsOfInterest.map((point, index) => (
      
    <PointOfInterest
      key={index}
      data={point}
    />
    ))}
  </ul>
  <PointOfInterest data={point} />
 </div>
  )
}

export default TabPointOfInterest;