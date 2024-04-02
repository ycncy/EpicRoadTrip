"use client";
import React, {useState} from 'react';
import TabPointOfInterest from './TabPointOfInterest';
import TabItinerary from './TabItinerary';
import TripInformations from "@/app/components/Trip/TripInformations";

const Sidebar = (props: { tripId: string }) => {
    const [activeTab, setActiveTab] = useState('informations');

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gray-200 min-h-screen w-1/3 flex-grow">
            <div className="flex">
                <button
                    className={`flex-1 py-2 ${
                        activeTab === 'informations' ? 'bg-blue-500 text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('informations')}
                >
                    Résumé du trajet
                </button>
                <button
                    className={`flex-1 py-2 ${
                        activeTab === 'pointInteret' ? 'bg-blue-500 text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('pointInteret')}
                >
                    Point d'Intérêt
                </button>
                <button
                    className={`flex-1 py-2 ${
                        activeTab === 'itineraire' ? 'bg-blue-500 text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('itineraire')}
                >
                    Itinéraire
                </button>
            </div>
            <div>
                {activeTab === 'pointInteret' && (
                    <TabPointOfInterest tripId={props.tripId}/>
                )}
                {activeTab === 'itineraire' && (
                    <TabItinerary tripId={props.tripId}/>
                )}
                {activeTab === 'informations' && (
                    <TripInformations tripId={props.tripId}/>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
