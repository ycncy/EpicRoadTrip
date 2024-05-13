import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import PointOfInterest from './PointOfInterest';
import FilterModal from './Modal/FilterModal';
import {tripService} from '../lib/service/trip.service';
import {placesService} from "@/app/lib/service/place.service";
import {Place, PlaceType} from "@/app/lib/model/Place";

const PlaceTypeValues = [
    PlaceType.CAR_UTILITIES,
    PlaceType.CULTURE,
    PlaceType.ENTERTAINMENT,
    PlaceType.FINANCE,
    PlaceType.BAR,
    PlaceType.RESTAURANT,
    PlaceType.ADMINISTRATIVE_SERVICE,
    PlaceType.HEALTH,
    PlaceType.ACCOMMODATION,
    PlaceType.SERVICES,
    PlaceType.SHOPPING,
    PlaceType.SPORT,
    PlaceType.TRANSPORT
];

const TabPointOfInterest = (props: { tripId: string }) => {
    const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
    const [trip, setTrip] = useState<any | null>(null);
    const [pointsOfInterest, setPointsOfInterest] = useState<Place[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripData = await tripService.getTripById(props.tripId);
                setTrip(tripData);
                const response = await placesService.getPlaces({
                    place_type: PlaceType.BAR,
                    latitude: tripData.startPosition.latitude,
                    longitude: tripData.startPosition.longitude,
                    radius: 1000
                });
                setPointsOfInterest(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [props.tripId]);

    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleSortChange = async (place: PlaceType) => {
        const response = await placesService.getPlaces({
            place_type: place,
            latitude: trip.startPosition.latitude,
            longitude: trip.startPosition.longitude,
            radius: 1000
        });
        setPointsOfInterest(response);
    };

    return (
        <div className="py-2">
            <div className="hide-scrollbar p-2 flex gap-2 overflow-y-scroll">
                {PlaceTypeValues.map(place => (
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full"
                        key={place} onClick={() => handleSortChange(place)}>
                        {place.valueOf()}
                    </button>
                ))}
            </div>
            <div className="p-4 ">
                {isSortModalOpen && <FilterModal onClose={handleCloseFilterModal}/>}
            </div>
            <ul className="py-2 flex flex-col gap-2">
                {pointsOfInterest.map((point, index) => (
                    <PointOfInterest key={index} data={point} tripId={trip.id}/>
                ))}
            </ul>
        </div>
    );
};

export default TabPointOfInterest;
