import React, {useEffect, useState} from 'react'
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import FinishFlag from "../public/images/finish-flag.png";
import Accommodation from "@/app/public/images/accommodation.png"

dayjs.extend(localizedFormat);
import 'dayjs/locale/fr';
import Image from "next/image";
import {TripStop} from "@/app/lib/model/TripStop";

const TabItinerary = (props: {tripId: string}) => {
    const [trip, setTrip] = useState<Trip>();
    const [tripStops, setTripStops] = useState<TripStop[]>([])
    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            const tripStops: TripStop[] = await tripService.getTripStops(props.tripId);
            const start = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${trip.startPosition.longitude}&lat=${trip.startPosition.latitude}`);
            const startResult = await start.json();
            const end = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${trip.endPosition.longitude}&lat=${trip.endPosition.latitude}`);
            const endResult = await end.json();

            setTrip(trip);
            setTripStops(tripStops);
            setStartLocation(startResult.features[0].properties.city);
            setEndLocation(endResult.features[0].properties.city);
        }

        loadTripData();
    }, []);

    return (
        <div className="flex flex-col gap-4 py-2">
            {
                trip?.startDatetime && trip?.endDatetime ? <div className="flex justify-between px-2">
                    <p className="text-lg ">{dayjs(trip?.startDatetime).locale('fr').format('D MMMM YYYY, HH:mm')}</p>
                    <p className="text-lg">{dayjs(trip?.endDatetime).locale('fr').format('D MMMM YYYY, HH:mm')}</p>
                </div> : <></>
            }
            <div className="flex justify-start items-center gap-8 p-4 bg-white">
                <div className="rounded-full bg-green-400 w-12 h-12 p-3 flex justify-center">
                    <Image
                        src={FinishFlag}
                        width="32"
                        height="32"
                        alt="finish"
                    />
                </div>
                <div>
                    <h1 className="text-lg font-bold">Point de départ</h1>
                    <h2 className="text-md">{startLocation}</h2>
                </div>
            </div>
            {
                tripStops.length > 0 ? <div>
                    {tripStops.map((tripStop: TripStop, index) => {
                        return (
                            <div className="flex justify-start items-center gap-8 p-4 bg-white" key={index}>
                                <div className="rounded-full bg-blue-400 w-12 h-12 p-3 flex justify-center">
                                    <Image
                                        src={Accommodation}
                                        width="24"
                                        height="24"
                                        alt="finish"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-md font-bold">{tripStop.name}</h1>
                                    <h2 className="text-sm">{tripStop.description}</h2>
                                </div>
                            </div>
                        )
                    })}
                </div> : <></>
            }
            <div className="flex justify-start items-center gap-8 p-4 bg-white">
                <div className="rounded-full bg-red-400 w-12 h-12 p-3 flex justify-center">
                    <Image
                        src={FinishFlag}
                        width="32"
                        height="32"
                        alt="finish"
                    />
                </div>
                <div>
                    <h1 className="text-lg font-bold">Point d'arrivée</h1>
                    <h2 className="text-md">{endLocation}</h2>
                </div>
            </div>
        </div>
    )
}

export default TabItinerary