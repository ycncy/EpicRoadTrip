"use client";
import React, { useState } from 'react';
import TabPointOfInterest from './TabPointOfInterest';
import TabItinerary from './TabItinerary';

const Sidebar = (props: {tripId: string}) => {
  const [activeTab, setActiveTab] = useState('pointInteret');
  
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-200 h-screen w-1/3 rounded-r-xl flex flex-col rounded-md">
    <div className="flex-grow">
      <div className="flex">
        <button
          className={`flex-1 py-2 ${
            activeTab === 'pointInteret' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('pointInteret')}
        >
          Point d'Intérêt
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === 'itineraire' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('itineraire')}
        >
          Itinéraire
        </button>
      </div>
      <div className="py-2">
        {activeTab === 'pointInteret' && (
            <TabPointOfInterest tripId={props.tripId}/>
        )}
        {activeTab === 'itineraire' && (
          <TabItinerary tripId={props.tripId} />
        )}
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
