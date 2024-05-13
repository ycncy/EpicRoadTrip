import {PlaceType} from "@/app/lib/model/Place";
import {Position} from "@/app/lib/model/Position";

export interface TripStop {
    id?: number,
    tripId?: string,
    googleId?: string,
    type: string,
    name: string,
    description: string,
    position: Position
}

export interface CreateTripStopDto {
    google_id: string;
    type: PlaceType;
    position: Position;
    name: string;
    description: string;
}