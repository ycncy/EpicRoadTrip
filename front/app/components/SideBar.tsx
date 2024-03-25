"use client";
import React, { useState } from 'react';
import TabPointOfInterest from './TabPointOfInterest';
import TabItinerary from './TabItinerary';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('pointInteret');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };


  return (
    <div className="bg-gray-200 h-screen w-80 flex flex-col mt-10 rounded-md">
    <div className="flex-grow mt-0">
      <div className="flex">
        <button
          className={`flex-1 py-2 rounded-tl-md rounded-bl-md ${
            activeTab === 'pointInteret' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('pointInteret')}
        >
          Point d'Intérêt
        </button>
        <button
          className={`flex-1 py-2 rounded-tr-md rounded-br-md ${
            activeTab === 'itineraire' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleTabChange('itineraire')}
        >
          Itinéraire
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'pointInteret' && (
            <TabPointOfInterest />
        )}
        {activeTab === 'itineraire' && (
          <TabItinerary />
        )}
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
