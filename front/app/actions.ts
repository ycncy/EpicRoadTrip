'use server'

import { redirect } from 'next/navigation'
import {Trip} from "@/app/lib/model/Trip";
import {tripService} from "@/app/lib/service/trip.service";

export async function navigateToTripById(data: FormData) {
    redirect(`/trip?id=${data.get('id')}`)
}

export async function createTrip(data: FormData) {
    const trip: Trip = {
        startPosition: {
            latitude: 34.000,
            longitude: 34.000
        },
        endPosition: {
            latitude: 34.000,
            longitude: 34.000
        },
        endDatetime: data.get("endDatetime"),
        startDatetime: data.get("startDatetime"),
        title: data.get("title")
    }
    const createdTrip: Trip = await tripService.createTrip(trip);

    redirect(`/trip?id=${createdTrip.id}`)
}