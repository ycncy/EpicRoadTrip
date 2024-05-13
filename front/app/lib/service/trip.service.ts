import { Trip } from "@/app/lib/model/Trip";
import { DeleteResponse } from "@/app/lib/model/DeleteResponse";
import {CreateTripStopDto, TripStop} from "@/app/lib/model/TripStop";
import dayjs from "dayjs";
import axiosService from "@/app/lib/service/axios.service";

const createTrip = async (trip: Trip): Promise<Trip> => {
    try {
        const response = await axiosService.post("/trips", trip);
        return response.data;
    } catch (error) {
        console.error("Failed to create trip", error);
        throw error;
    }
};

const getTripStops = async (tripId: string | null): Promise<TripStop[]> => {
    try {
        const response = await axiosService.get(`trips/${tripId}/stops`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to get trip stops", error);
        throw error;
    }
};


const addTripStop = async (tripId: string, data: CreateTripStopDto): Promise<TripStop> => {
    try {
        const response = await axiosService.post(
            `trip-stops?trip_id=${tripId}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Failed to get trip stops", error);
        throw error;
    }
}


const getTripById = async (tripId: string | null): Promise<Trip> => {
    try {
        const response = await axiosService.get(`trips/${tripId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get trip by id", error);
        throw error;
    }
};

const deleteTripById = async (tripId: string): Promise<DeleteResponse> => {
    try {
        const response = await axiosService.delete(`trips/${tripId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete trip", error);
        throw error;
    }
};

const patchTripById = async (tripId: string | undefined, tripPatchModel: {
    startDatetime: dayjs.Dayjs | null;
    startLocation: {} | null;
    title: string | null;
    endLocation: {} | null;
    endDatetime: dayjs.Dayjs | null;
}): Promise<Trip> => {
    try {
        const response = await axiosService.patch(`trips/${tripId}`, tripPatchModel);
        return response.data;
    } catch (error) {
        console.error("Failed to patch trip", error);
        throw error;
    }
};

export const tripService = {
    getTripById,
    getTripStops,
    addTripStop,
    createTrip,
    patchTripById,
    deleteTripById
};
