import {Trip} from "@/app/lib/model/Trip";
import {DeleteResponse} from "@/app/lib/model/DeleteResponse";
import axios from "axios";
import {TripStop} from "@/app/lib/model/TripStop";

const axiosService = axios.create({
    baseURL: "http://localhost:8080/trip"
})

const createTrip = async (trip: Trip): Promise<Trip> => {
    const response = await axiosService.post("", trip);

    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error("Failed to create trip");
    }
}
const getTripStops = async (tripId: string | null): Promise<TripStop[]> => {
    const response = await axiosService.get(`/${tripId}/stops`);

    if (response.status !== 404) {
        return response.data;
    } else {
        throw new Error("Failed to get trip stops");
    }
}
const getTripById = async (tripId: string | null): Promise<Trip> => {
    const response = await axiosService.get(`/${tripId}`);

    if (response.status !== 404) {
        return response.data;
    } else {
        throw new Error("Failed to get trip by id");
    }
}

const deleteTripById = async (tripId: string): Promise<DeleteResponse> => {
    const response = await axiosService.delete(`/${tripId}`);

    if (response.status !== 404) return response.data;

    throw new Error("Failed to delete trip");
}

const patchTripById = async (tripId: string, tripPatchModel: Partial<Trip>): Promise<Trip> => {
    const response = await axiosService.patch(`/${tripId}`, tripPatchModel);

    if (response.status !== 404) return response.data;

    throw new Error("Failed to patch trip");
}

export const tripService = {
    getTripById,
    getTripStops,
    createTrip,
    patchTripById,
    deleteTripById
}