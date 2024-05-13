import axiosService from "@/app/lib/service/axios.service";
import {GetPlacesDTO, Place} from "@/app/lib/model/Place";

const getPlaces = async (
    getPlacesDto: GetPlacesDTO
): Promise<[Place]> => {
    try {
        const response = await axiosService.get("/places", {
            params: getPlacesDto
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create trip", error);
        throw error;
    }
};

export const placesService = {
    getPlaces
}