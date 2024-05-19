"use client";
import React, {useEffect, useState} from 'react';
import {Trip} from "@/app/lib/model/Trip";
import {TripStop} from "@/app/lib/model/TripStop";
import {tripService} from "@/app/lib/service/trip.service";
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';


const Map = (props: { tripId: string }) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyByMtuPQiVslM13KHlnApKf2WsNY2pdfhY"
    })

    const [map, setMap] = React.useState(null)
    const [directions, setDirections] = useState(null);


    const [trip, setTrip] = useState<Trip>();
    const [center, setCenter] = useState<{lat: number, lng: number}>();
    const [tripStops, setTripStops] = useState<TripStop[]>([]);

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            const tripStops: TripStop[] = await tripService.getTripStops(props.tripId);

            setCenter({
                lat: trip.startPosition.latitude,
                lng: trip.startPosition.longitude
            })
            setTrip(trip);
            setTripStops(tripStops);

            const directionsService = new window.google.maps.DirectionsService();
            const waypoints = tripStops.map(stop => ({
                location: new window.google.maps.LatLng(stop.position.latitude, stop.position.longitude),
                stopover: true
            }));

            directionsService.route({
                origin: new window.google.maps.LatLng(trip.startPosition.latitude, trip.startPosition.longitude),
                destination: new window.google.maps.LatLng(trip.endPosition.latitude, trip.endPosition.longitude),
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`Error fetching directions ${result}`);
                }
            });
        }

        loadTripData();
    }, [props.tripId]);

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={"w-full"}
            center={center}
            zoom={10}
            onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
                map.fitBounds(bounds);
            }}
            onUnmount={map => {
                setMap(null)
            }}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    ) : <></>
};

export default Map;