
"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation"
import {locationApiService} from "@/app/lib/service/location-api.service";
import {Autocomplete, Box, TextField} from "@mui/material";
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CreateTripForm = () => {
    const [formData, setFormData] = useState(
        {
            startLocation: {},
            endLocation: {},
            title: "",
            startDatetime: dayjs(null),
            endDatetime: dayjs(null)
        }
    );
    const [suggestions, setSuggestions] = useState<{}>(
        {
            startLocationSuggestions: [],
            endLocationSuggestions: [],
        }
    );
    const router = useRouter();

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
        const {name, value} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trip: Trip = {
            userId: localStorage.getItem("userId"),
            startPosition: formData.startLocation,
            endPosition: formData.endLocation,
            endDatetime: formData.endDatetime.toDate(),
            startDatetime: formData.startDatetime.toDate(),
            title: formData.title
        }
        const createdTrip: Trip = await tripService.createTrip(trip);

        router.push(`/trip?id=${createdTrip.id}`)
    }

    return (
        <div
            className="bg-white w-10/12 mx-auto rounded-2xl text-black flex gap-16 py-6 px-8">
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-lg">Où allez-vous ?</h1>
                <Box
                    component="form"
                    className="flex flex-col gap-4"
                >
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
                                label="Ville d'arrivée" name="endLocation"
                            />
                        }
                    />
                </Box>
            </div>
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-lg">Quand ? (Optionnel)</h1>
                <div className="flex flex-col gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                }
                            }}
                            label="Date de départ"
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                }
                            }}
                            label="Date d'arrivée"
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
            </div>
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-lg">Où allez-vous ?</h1>
                <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                }
                            }}
                            className="w-full rounded-2xl"
                            required
                            id="outlined-required"
                            label="Titre de votre Road Trip"
                            name="title" value={formData.title} onChange={handleChange}/>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#5739FC] text-md h-full p-2 text-white rounded-xl">
                        Créer votre road-trip !
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTripForm;
