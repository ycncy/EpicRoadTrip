import React, {useEffect, useState} from 'react';
import PointOfInterest from './PointOfInterest';
import FilterModal from './Modal/FilterModal';
import {tripService} from '../lib/service/trip.service';
import {placesService} from "@/app/lib/service/place.service";
import {Place, PlaceType} from "@/app/lib/model/Place";
import {CircularProgress} from "@mui/material";

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

const getCityNameByPosition = async (latitude: number, longitude: number): Promise<string | undefined> => {
    const apiKey = 'AIzaSyByMtuPQiVslM13KHlnApKf2WsNY2pdfhY'; // Replace with your actual Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find((component: any) => component.types.includes("locality"));

            const adminComponent = addressComponents.find((component: any) => component.types.includes("administrative_area_level_1"));

            return cityComponent ? cityComponent.long_name : (adminComponent ? adminComponent.long_name : undefined);
        }
        return undefined;
    } catch (error) {
        console.error('Failed to fetch city name:', error);
        return undefined;
    }
};

const getStepsPositions = async (data: any) => {
    const apiSteps = new Map<string, any>();
    for (const step of data["routes"][0]["legs"][0]["steps"]) {
        const city_name = await getCityNameByPosition(step["startLocation"]["latLng"]["latitude"], step["startLocation"]["latLng"]["longitude"])
        if (city_name != null) {
            apiSteps.set(
                city_name,
                {
                    latitude: step["startLocation"]["latLng"]["latitude"],
                    longitude: step["startLocation"]["latLng"]["longitude"]
                }
            )
        }
    }

    return apiSteps;
}

const TabPointOfInterest = (props: { tripId: string }) => {
    const userId = localStorage.getItem("userId");
    const [isSortModalOpen, setIsFilterModalOpen] = useState(false);
    const [trip, setTrip] = useState<any | null>(null);
    const [steps, setSteps] = useState<Map<string, any>>(new Map<string, any>());
    const [pointOfInterest, setPointOfInterest] = useState<Map<string, Place[]>>(new Map<string, Place[]>())
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingPlaces(true);
            try {
                const tripData = await tripService.getTripById(props.tripId);
                setTrip(tripData);

                //////////////////////////////////////////////////////////////////////

                const fetchDirections = async () => {
                    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
                    const headers = {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': 'AIzaSyByMtuPQiVslM13KHlnApKf2WsNY2pdfhY',
                        'X-Goog-FieldMask': '*'
                    };

                    const body = {
                        origin: {
                            location: {
                                latLng: {
                                    latitude: tripData.startPosition.latitude,
                                    longitude: tripData.startPosition.longitude
                                }
                            }
                        },
                        destination: {
                            location: {
                                latLng: {
                                    latitude: tripData.endPosition.latitude,
                                    longitude: tripData.endPosition.longitude
                                }
                            }
                        },
                        travelMode: "DRIVE",
                        routingPreference: "TRAFFIC_AWARE",
                        languageCode: "fr-FR"
                    };

                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        const apiSteps: any[] = await getStepsPositions(data);

                        return apiSteps;
                    } catch (error) {
                        console.error('Fetching directions failed:', error);
                    }
                };
                const apiSteps = await fetchDirections();
                setSteps(apiSteps)

                //////////////////////////////////////////////////////////////////////////////////

                const getPlaces = async (place: PlaceType) => {
                    const places = new Map<string, Place[]>();

                    for (let [key, value] of apiSteps.entries()) {
                        const response = await placesService.getPlaces({
                            place_type: place,
                            latitude: value["latitude"],
                            longitude: value["longitude"],
                            radius: 10000
                        });

                        places.set(key, response)
                    }

                    return places
                }

                const result = await getPlaces(PlaceType.ACCOMMODATION);

                setIsLoadingPlaces(false);
                setPointOfInterest(result)
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
        setIsLoadingPlaces(true);

        const getPlaces = async (place: PlaceType) => {
            const places = new Map<string, any>();

            for (let [key, value] of steps.entries()) {
                const response = await placesService.getPlaces({
                    place_type: place,
                    latitude: value["latitude"],
                    longitude: value["longitude"],
                    radius: 10000
                });

                places.set(key, response)
            }

            return places
        }

        const result = await getPlaces(place);

        setIsLoadingPlaces(false);
        setPointOfInterest(result);
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
            {
                isLoadingPlaces && <div className="w-full flex justify-center items-center" >
                    <CircularProgress/>
                </div>
            }
            {
                !isLoadingPlaces && <div className="flex flex-col gap-2">
                    {Array.from(pointOfInterest).map(([key, value]) => (
                        <div key={key}>
                            <h1 className="px-2 text-2xl font-semibold text-black">{key}</h1>
                            <div className="py-2 flex flex-col gap-2">
                                {value.map((poi, index) => (
                                    <PointOfInterest key={index} data={poi} tripId={trip.id}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default TabPointOfInterest;
