"use client";
import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {Trip} from "@/app/lib/model/Trip";
import {TripStop} from "@/app/lib/model/TripStop";
import {tripService} from "@/app/lib/service/trip.service";
import * as L from 'leaflet';
import Icon from "../public/images/marker.png";


const Map = (props: { tripId: string }) => {
    const [trip, setTrip] = useState<Trip>();
    const [tripStops, setTripStops] = useState<TripStop[]>([]);

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            const tripStops: TripStop[] = await tripService.getTripStops(props.tripId);

            setTrip(trip);
            setTripStops(tripStops);
        }

        loadTripData();
    }, [props.tripId]);

    return (
        trip !== undefined ?
            <MapContainer center={[trip.startPosition.latitude, trip?.startPosition.longitude]} zoom={13}
                          className="w-screen"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    trip.startPosition.latitude && trip?.startPosition.longitude && (
                        <Marker
                            position={[trip.startPosition.latitude, trip?.startPosition.longitude]}
                            icon={L.icon({
                                iconSize: [36, 36],
                                iconUrl: Icon.src
                            })}
                        >
                            <Popup>
                                Point de départ de votre Road Trip
                            </Popup>
                        </Marker>
                    )
                }
                {
                    trip.endPosition.latitude && trip.endPosition.longitude && (
                        <Marker
                            position={[trip.endPosition.latitude, trip.endPosition.longitude]}
                            icon={L.icon({
                                iconSize: [36, 36],
                                iconUrl: Icon.src
                            })}
                        >
                            <Popup>
                                Point de départ de votre Road Trip
                            </Popup>
                        </Marker>
                    )
                }

            </MapContainer> : <></>
    );
};

export default Map;