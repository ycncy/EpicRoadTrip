import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import PointOfInterest from './PointOfInterest';
import SortModal from './Modal/FilterModal';
import { tripService } from '../lib/service/trip.service';

const TabPointOfInterest = ({ tripId }: { tripId: string }) => {
  const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
  const [pointsOfInterest, setPointsOfInterest] = useState<any[]>([]);
  const [trip, setTrip] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripService.getTripById(tripId);
        setTrip(tripData);
        console.log("aa",tripData);

        const response = await fetch("https://data.datatourisme.gouv.fr/10/000ce9fa-eaca-3d78-a395-8798b5965cbc");
        const data = await response.json();
        setPointsOfInterest(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tripId]);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = event.target.value;
    // Handle sorting logic here
  };

  return (
    <div>
      {trip && trip.title}
      <div className="flex justify-center mb-4">
        <button onClick={handleOpenFilterModal} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-14">
          <FontAwesomeIcon icon={faBars} className='mr-2' />
          Filtrer
        </button>
        <select id="sort" name="sort" className="px-2 py-1 bg-blue-500 text-white rounded-md" onChange={handleSortChange}>
          <option value="" disabled selected>
            Trier
          </option>
          <option value="option1">Les plus proches</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div className="p-4">
        {isSortModalOpen && <SortModal onClose={handleCloseFilterModal} />}
      </div>
      <ul>
        {pointsOfInterest.map((point, index) => (
          <PointOfInterest key={index} data={point} />
        ))}
      </ul>
    </div>
  );
};

export default TabPointOfInterest;
