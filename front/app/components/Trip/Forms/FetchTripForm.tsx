"use client";
import React from 'react';
import {navigateToTripById} from "@/app/actions";
import {TextField} from "@mui/material";

const FetchTripForm = () => {

    return (
        <div className="bg-white w-10/12 mx-auto rounded-2xl text-black flex gap-16 py-6 px-8">
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-lg">Rechercher un Road Trip existant</h1>
                <div className="w-full">
                    <form
                        action={navigateToTripById}
                        className="flex">
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px 0px 0px 12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                }
                            }}
                            className="w-full rounded-2xl"
                            required
                            id="outlined-required"
                            label="Identifiant de votre Road Trip"
                            name="id"
                        />
                        <button
                            className="bg-[#5739FC] p-3 text-sm text-white rounded-r-xl">
                            Rechercher
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FetchTripForm;