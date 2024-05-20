"use client";
import React, {useEffect, useState} from 'react';
import TabPointOfInterest from './TabPointOfInterest';
import TabItinerary from './TabItinerary';
import TripInformations from "@/app/components/Trip/TripInformations";
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";
import dayjs from "dayjs";

const Sidebar = (props: { tripId: string }) => {
    const userId = localStorage.getItem("userId");
    const [trip, setTrip] = useState<Trip>();
    const [activeTab, setActiveTab] = useState('informations');

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            setTrip(trip);
        }
        loadTripData();
    }, []);

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gray-200 h-screen text-black overflow-y-auto w-1/3 flex-grow">
            <div className="flex">
                <button
                    className={`flex-1 py-2 ${
                        activeTab === 'informations' ? 'bg-[#5739FC] text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('informations')}
                >
                    Résumé du trajet
                </button>
                {trip?.user_id == userId && <button
                    className={`flex-1 py-4 ${
                        activeTab === 'pointInteret' ? 'bg-[#5739FC] text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('pointInteret')}
                >
                    Point d'Intérêt
                </button>}
                <button
                    className={`flex-1 py-2 ${
                        activeTab === 'itineraire' ? 'bg-[#5739FC] text-white text-center' : 'bg-gray-300 text-center'
                    }`}
                    onClick={() => handleTabChange('itineraire')}
                >
                    Itinéraire
                </button>
            </div>
            <div>
                {activeTab === 'pointInteret' &&  (
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
