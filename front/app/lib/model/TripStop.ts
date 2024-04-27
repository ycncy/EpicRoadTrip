import {Position} from "@/app/lib/model/Position";

export interface TripStop {
    id?: number,
    tripId?: string,
    type: string,
    name: string,
    description: string,
    position: Position
}