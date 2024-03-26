"use client";
import React, { useState } from 'react';
import TabPointOfInterest from './TabPointOfInterest';
import TabItinerary from './TabItinerary';

const Sidebar = ({ tripId }: { tripId: string }) => {
  const [activeTab, setActiveTab] = useState('pointInteret');
  const [shareOption, setShareOption] = useState('');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const handleShareOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedOption = event.target.value;
    if (selectedOption === 'link') {
      const currentURL = window.location.href;
      navigator.clipboard.writeText(currentURL)
        .then(() => {
          console.log("Trip link copied to clipboard:", currentURL);
          alert("Le lien du trajet a été copié dans le presse-papier"); 
        })
        .catch((error) => {
          console.error("Failed to copy trip link to clipboard:", error);
        });
    } else if (selectedOption === 'app') {
      console.log("Sharing trip via phone applications");
    }
    setShareOption(selectedOption);
  };

  return (
    <div className="bg-gray-200 h-screen w-1/3 flex flex-col rounded-md">
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
            <TabPointOfInterest tripId={tripId} />
          )}
          {activeTab === 'itineraire' && (
            <TabItinerary tripId={tripId} />
          )}
        </div>
      </div>
      <div className="p-2">
        <select
          value={shareOption}
          onChange={handleShareOptionChange}
          className="py-1 px-2 bg-blue-500 text-white rounded-md"
        >
          <option disabled selected  value="">Partager le trip...</option>
          <option value="link">Copier le lien</option>
          <option value="app">Partager</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
