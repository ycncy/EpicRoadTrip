"use client";
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMap} from '@fortawesome/free-solid-svg-icons';
import {Place} from "@/app/lib/model/Place";
import Link from "next/link";
import {tripService} from "@/app/lib/service/trip.service";
import {CreateTripStopDto} from "@/app/lib/model/TripStop";

export default function PointOfInterest({data, tripId}: { data: Place, tripId: string }) {

    const handleAddTripStop = async () => {
        try {
            const tripStopData: CreateTripStopDto = {
                google_id: data.google_id,
                position: data.location,
                name: data.name,
                description: data.summary ? data.summary : "",
                type: data.type
            }
            console.log(data)
            await tripService.addTripStop(tripId, tripStopData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-white p-4 flex justify-center items-center gap-4">
            <div className="w-1/4">
                {data.image_url ? (
                    <img
                        className="rounded-full"
                        src={`https://${data.image_url}`}
                        alt=""
                    />
                ) : (
                    <img
                        className="rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/7705/7705037.png"
                        alt=""
                    />
                )}
            </div>
            <div className="w-3/4">
                <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
                <h2 className="text-sm mb-2">{data.address}</h2>
                <h2 className="text-sm mb-2">{data.summary}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleAddTripStop}
                        className="px-2 py-2 bg-[#5739FC] text-white rounded-md flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    {data.google_maps_url ? (
                        <Link href={data.google_maps_url}>
                            <button
                                className="px-2 py-2 bg-[#5739FC] text-white rounded-md flex items-center justify-center">
                                <FontAwesomeIcon icon={faMap}/>
                            </button>
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="px-2 py-2 bg-gray-500 text-white rounded-md flex items-center justify-center">
                            <FontAwesomeIcon icon={faMap}/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}