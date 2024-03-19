import {Position} from "@/app/lib/model/Position";

export interface Trip {
    id: string;
    title: string;
    description?: string;
    startPosition: Position;
    endPosition: Position;
    startDatetime?: Date;
    endDatetime?: Date;
}