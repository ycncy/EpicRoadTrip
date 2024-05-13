import React, { useEffect, useState } from 'react';
import PointOfInterest from './PointOfInterest';
import FilterModal from './Modal/FilterModal';

const TabPointOfInterest = (props: { tripId: string }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [pointsOfInterest, setPointsOfInterest] = useState<any[]>([]);
  const [trip, setTrip] = useState<any | null>(null);

  useEffect(() => {

  }, [props.tripId]);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className="py-2">
      {trip && trip.title}
      <div className="flex justify-center mb-4">
        <button onClick={handleOpenFilterModal} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-14">
          Filtrer
        </button>
      </div>
      <div className="p-4">
        {isFilterModalOpen && <FilterModal onClose={handleCloseFilterModal} />}
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
