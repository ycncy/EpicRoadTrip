import {Trip} from "@/app/lib/model/Trip";
import {DeleteResponse} from "@/app/lib/model/DeleteResponse";
import axios from "axios";

const axiosService = axios.create({
    baseURL: "http://localhost:8080/api"
})

const createTrip = async (trip: Trip): Promise<Trip> => {
    const response = await axiosService.post("", trip);

    if (response.status === 201) return response.data;
}

const getTripById = async (tripId: string): Promise<Trip> => {
    const response = await axiosService.get(`/${tripId}`);

    if (response.status !== 404) return response.data;
}

const deleteTripById = async (tripId: string): Promise<DeleteResponse> => {
    const response = await axiosService.delete(`/${tripId}`);

    if (response.status !== 404) return response.data;
}

const patchTripById = async (tripId: string, tripPatchModel: Partial<Trip>): Promise<Trip> => {
    const response = await axiosService.patch(`/${tripId}`, tripPatchModel);

    if (response.status !== 404) return response.data;
}

export const tripService = {
    getTripById,
    createTrip,
    patchTripById,
    deleteTripById
}