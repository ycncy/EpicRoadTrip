"use client";
import React from 'react'
import Sidebar from '../components/SideBar'
import Navbar from '../components/Navbar';
import {useSearchParams} from "next/navigation";
import Map from "../components/Map"

const TripPage = () => {
    const searchParams = useSearchParams();
    const tripId = searchParams.get("id");

    if (!tripId) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p>Le trip n'existe pas</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 flex overflow-hidden">
                <Sidebar tripId={searchParams.get("id") ?? ""}/>
                <Map tripId={searchParams.get("id") ?? ""}/>
            </div>
        </div>
    )
}

export default TripPage;
