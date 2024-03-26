"use client";
import React, {useEffect, useState} from 'react';
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";
import {FormControlLabel, Slide} from "@mui/material";
import {Switch} from "@mui/base";

const TripInformations = (props) => {
    const [trip, setTrip] = useState<Trip>();

    useEffect(() => {
        const loadTripData = async () => {
            const trip: Trip = await tripService.getTripById(props.tripId);
            setTrip(trip);
        }

        loadTripData();
    }, []);

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Show"
            />
            <Slide
                direction="right"
                in={checked}
                mountOnEnter unmountOnExit
            >
                <div className="w-1/4">
                    <p>ozeinfzoeifn</p>
                </div>
            </Slide>
            <p>{trip?.title}</p>
        </div>
    );
};

export default TripInformations;