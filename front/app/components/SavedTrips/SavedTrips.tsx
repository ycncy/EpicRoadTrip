"use client";
import React, { useState, useEffect } from 'react';

const SavedTrips = () => {
    const [savedTrips, setSavedTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('votre_endpoint_api');
                const data = await response.json();
                setSavedTrips(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des trips:', error);
            }
        };

        fetchTrips();
    }, []);

    return (
<div className="bg-[#5739FC] flex flex-col gap-12 p-16 h-screen background-opacity-10" >
<div className="bg-cover h-2/3 w-full flex flex-col gap-4 text-center mx-auto text-white" style={{ 
                backgroundImage: `url('https://www.carnets-voyages.org/wp-content/uploads/2020/12/idees-road-trip-europe.jpg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                                <p className="text-lg sm:text-5xl font-serif">Retrouvez tous vos road trips!</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mx-auto">
                {savedTrips.map((trip, index) => (
                    <div key={index} className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{trip.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{trip.start_position} - {trip.end_position} </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{trip.start_datetime} - {trip.end_datetime} </p>

                        <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            Voir sur la carte
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </a>
                    </div>
                ))}
                    <div  className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">exemple</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">aa</p>
                        <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            Voir sur la carte
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </a>
                    </div>
                    <div  className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">exemple</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lieu de depart- lieu d'arrivé</p>
                        <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            Voir sur la carte
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </a>
                    </div>
                    <div  className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">exemple</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">aa</p>
                        <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            Voir sur la carte
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </a>
                    </div>
                    <div  className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">exemple</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">aa</p>
                        <a href="/"  className="inline-flex font-medium items-center text-blue-600 hover:underline">
                            Voir sur la carte
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                            </svg>
                        </a>
                    </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="/" className="flex flex-col justify-center items-center h-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        <p className="text-gray-700 dark:text-gray-400">Ajouter un nouveau road trip</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SavedTrips;
