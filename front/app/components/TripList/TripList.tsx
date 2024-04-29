"use client";
import React, { useState, useEffect } from 'react';

const TripList = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setTrips(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des trips:', error);
            }
        };

        fetchTrips();
    }, []);

    return (
        <div className="bg-[#5739FC] flex flex-col gap-12 p-16">
            <div className="w-2/5 flex flex-col gap-4 text-center mx-auto text-white">
                <p className="text-lg">Retrouvez tous vos road trips !</p>
            </div>
            <div className="flex flex-col gap-4 text-center mx-auto text-white">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="bg-gray-800 p-4 rounded cursor-pointer"
                        onClick={() => router.push(`/trip?id=${trip.id}`)}
                    >
                      <h2 className="text-xl font-semibold">{trip.name}</h2>
                        <p>{trip.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripList;
