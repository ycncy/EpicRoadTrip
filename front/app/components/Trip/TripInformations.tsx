"use client";
import React, {useEffect, useState} from 'react';
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";
//import Car from "@/app/public/images/car.png"
import {TripStop} from "@/app/lib/model/TripStop";
import Image from "next/image";
import {Autocomplete, Box, Button, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import dayjs from "dayjs";
import {locationApiService} from "@/app/lib/service/location-api.service";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import { Switch } from '@mui/material';
import {useRouter} from "next/navigation";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import TripPDF from "@/app/components/TripPDF/TripPDF";
import Epic from "@/app/public/images/epic_road_trip.png";
const TripInformations = (props) => {
    const userId = localStorage.getItem("userId");
    const [trip, setTrip] = useState<Trip>();
    const [formData, setFormData] = useState(
        {
            startLocation: {},
            endLocation: {},
            title: "",
            startDatetime: dayjs(null),
            endDatetime: dayjs(null)
        }
    );
    const router = useRouter();

    const [suggestions, setSuggestions] = useState<{}>(
        {
            startLocationSuggestions: [],
            endLocationSuggestions: [],
        }
    );
    const [editMode, setEditMode] = useState(false);
    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            const start = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${trip.startPosition.longitude}&lat=${trip.startPosition.latitude}`);
            const startResult = await start.json();
            const end = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${trip.endPosition.longitude}&lat=${trip.endPosition.latitude}`);
            const endResult = await end.json();

            setTrip(trip);
            setFormData({
                startLocation: trip.startPosition,
                endLocation: trip.endPosition,
                title: trip.title,
                startDatetime: dayjs(trip.startDatetime),
                endDatetime: dayjs(trip.endDatetime)
            })
            setStartLocation(startResult.features[0].properties.city);
            setEndLocation(endResult.features[0].properties.city);
        }

        loadTripData();
    }, []);

    const fetchStartLocations = async (event) => {
        const query = event.target.value;
        if (query.length >= 3) {
            const locations = await locationApiService.getLocations(query);
            const formattedLocations = locations.map(location => ({
                label: location.label,
                position: location.position
            }));
            setSuggestions(prevSuggestions => ({
                ...prevSuggestions,
                startLocationSuggestions: formattedLocations,
            }));
        }
    }

    const fetchEndLocations = async (event) => {
        const query = event.target.value;
        if (query.length >= 3) {
            const locations = await locationApiService.getLocations(query);
            const formattedLocations = locations.map(location => ({
                label: location.label,
                position: location.position
            }));
            setSuggestions(prevSuggestions => ({
                ...prevSuggestions,
                endLocationSuggestions: formattedLocations,
            }));
        }
    }

    const handleChange = (event) => {
        console.log(event.target)
        const {name, value} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await tripService.patchTripById(trip?.id, {
            ...formData,
            userId: userId
        });
        router.refresh();
    }



    function handleExport(): void {
        const pdfModel = new TripPDF();
        pdfModel.addImage(Epic.src, 10, 10, 190, 80);

        pdfModel.addTitle(`Nom : ${formData.title}`, 10, 110);

        pdfModel.addText(`Date de départ: ${formData.startDatetime.format('YYYY-MM-DD HH:mm:ss')}`, 10, 120);
        pdfModel.addText(`Date d'arrivée: ${formData.endDatetime.format('YYYY-MM-DD HH:mm:ss')}`, 10, 130); 
        pdfModel.addText(`Ville de départ: ${startLocation}`, 10, 140); 
        pdfModel.addText(`Ville d'arrivée: ${endLocation}`, 10, 150); 

            
        pdfModel.addSubtitle(`Les arrêt du trajet: `, 10, 170);
        let yPos = 200;

        tripStops.forEach((tripStop, index) => {
            pdfModel.addText(`${index + 1}: ${tripStop.name}`, 10, yPos);
            pdfModel.addText(`Ville: ${tripStop.position}`, 10, yPos + 10);
            yPos += 20; 
        });

        pdfModel.save(`${formData.title}.pdf`);
    }


    function handleShare(): void {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
        .then(() => {
          console.log("Trip link copied to clipboard:", currentURL);
          alert("Trip link copied to clipboard: " + currentURL);
        })
        .catch((error) => {
          console.error("Failed to copy trip link to clipboard:", error);
        });
    }

    if (trip) {
        return (
            <div>
                <div className="p-6 flex justify-between">
                    <div>
                        <p className="text-lg font-bold">De</p>
                        <p className="text-md">{startLocation}</p>
                    </div>
                    <div>
                        <p className="text-lg text-right font-bold">À</p>
                        <p className="text-md">{endLocation}</p>
                    </div>
                </div>
                {
                    trip?.user_id == userId && <div className="flex px-2 justify-end items-center">
                        <p>Editer le trajet</p>
                        <Switch
                            checked={editMode}
                            onChange={() => setEditMode(!editMode)}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>
                }
                <div className="px-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl">Titre</h1>
                        <TextField
                            disabled={!editMode}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                }
                            }}
                            className="w-full rounded-2xl"
                            id="outlined-required"
                            name="title" value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl">Date de départ</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                disabled={!editMode}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                    "& .MuiAutocomplete-inputRoot": {
                                        borderRadius: "12px"
                                    }
                                }}
                                name="startDatetime" value={formData.startDatetime}
                                onChange={
                                    (value: any) => {
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            startDatetime: value,
                                        }));
                                    }
                                }
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl">Date d'arrivée</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                disabled={!editMode}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                    "& .MuiAutocomplete-inputRoot": {
                                        borderRadius: "12px"
                                    }
                                }}
                                name="endDatetime"
                                value={formData.endDatetime}
                                onChange={
                                    (value: any) => {
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            endDatetime: value,
                                        }));
                                    }
                                }
                            />
                        </LocalizationProvider>
                    </div>
                    {
                        editMode && <Box
                            component="form"
                            className="flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-2">
                                <h1 className="text-xl">Ville de départ</h1>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    aria-required={true}
                                    options={suggestions.startLocationSuggestions}
                                    onChange={(event, newValue) => {
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            startLocation: newValue ? newValue.position : {}
                                        }));
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   disabled={!editMode}
                                                   sx={{
                                                       "& .MuiOutlinedInput-root": {
                                                           borderRadius: "12px",
                                                       },
                                                       "& .MuiAutocomplete-inputRoot": {
                                                           borderRadius: "12px"
                                                       }
                                                   }}
                                                   required
                                                   onChange={fetchStartLocations}
                                                   label="Ville de départ" name="startLocation"
                                        />
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-xl">Ville d'arrivée</h1>
                                <Autocomplete
                                    disablePortal
                                    aria-required={true}
                                    id="combo-box-demo"
                                    options={suggestions.endLocationSuggestions}
                                    onChange={(event, newValue) => {
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            endLocation: newValue ? newValue.position : {}
                                        }));
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "12px",
                                                },
                                                "& .MuiAutocomplete-inputRoot": {
                                                    borderRadius: "12px"
                                                }
                                            }}
                                            required
                                            {...params} onChange={fetchEndLocations}
                                            disabled={!editMode}
                                            label="Ville d'arrivée" name="endLocation"
                                        />
                                    }
                                />
                            </div>
                        </Box>
                    }
                </div>
                {
                    editMode && <div className="p-4 flex gap-2 justify-self-end">
                        <button
                            onClick={handleSubmit}
                            className="w-full border-2 border-[#5739FC] bg-[#5739FC] text-md h-full p-2 text-white rounded-xl">
                            Modifier
                        </button>
                        <button
                            onClick={() => setFormData({
                                startLocation: trip?.startPosition,
                                endLocation: trip?.endPosition,
                                title: trip?.title,
                                startDatetime: dayjs(trip?.startDatetime),
                                endDatetime: dayjs(trip?.endDatetime)
                            })}
                            className="w-full border-2 border-gray-500 text-md h-full p-2 text-black rounded-xl">
                            Reset
                        </button>
                    </div>
                }

                <div className="flex px-4 py-8 gap-2">
                    <button
                        onClick={handleShare}
                        className="w-full border-2 border-gray-500 text-md h-full p-2 text-black rounded-xl"
                    >
                        Partager
                    </button>

                    <button
                        onClick={handleExport}
                        className="w-full border-2 border-gray-500 text-md h-full p-2 text-black rounded-xl"
                    >
                        Exporter
                    </button>
                </div>


            </div>
        );
    } else {
        return (
            <div className="w-full flex justify-center items-center">
                <CircularProgress/>
            </div>
        )
    }
};

export default TripInformations;