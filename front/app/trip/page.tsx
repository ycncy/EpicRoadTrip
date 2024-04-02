"use client";
import React from 'react'
import Sidebar from '../components/SideBar'
import Navbar from '../components/Navbar';
import {useSearchParams} from "next/navigation";
import Map from "../components/Map"

const TripPage = () => {
    const searchParams = useSearchParams();

    return (
        <div className="bg-gray-100 flex">
            <Sidebar tripId={searchParams.get("id")}/>
            <Map tripId={searchParams.get("id")}/>
        </div>

    )
}

export default TripPage;