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
        <div className="bg-gray-100 h-screen">
            {/*<Navbar/>*/}
            <div className="flex">
                <Sidebar tripId={tripId}/>
                <Map tripId={tripId}/>
            </div>
        </div>
    );
}


export default TripPage;