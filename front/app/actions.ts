'use server'

import { redirect } from 'next/navigation'

export async function navigateToTripById(data: FormData) {
    redirect(`/trip?id=${data.get('id')}`)
}