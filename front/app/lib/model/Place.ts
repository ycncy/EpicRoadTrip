import {Position} from "@/app/lib/model/Position";

export interface Place {
    google_id: string;
    address?: string;
    location: Position;
    type: PlaceType;
    google_maps_url?: string;
    name: string;
    phone_number?: string;
    website_url?: string;
    summary?: string;
    image_url?: string;
    rating?: number;
}

export enum PlaceType {
    CAR_UTILITIES = 'CAR_UTILITIES',
    CULTURE = 'CULTURE',
    ENTERTAINMENT = 'ENTERTAINMENT',
    FINANCE = 'FINANCE',
    BAR = 'BAR',
    RESTAURANT = 'RESTAURANT',
    ADMINISTRATIVE_SERVICE = 'ADMINISTRATIVE_SERVICE',
    HEALTH = 'HEALTH',
    ACCOMMODATION = 'ACCOMMODATION',
    SERVICES = 'SERVICES',
    SHOPPING = 'SHOPPING',
    SPORT = 'SPORT',
    TRANSPORT = 'TRANSPORT'
}


export interface GetPlacesDTO {
    place_type: PlaceType;
    latitude: number;
    longitude: number;
    radius: number;
}