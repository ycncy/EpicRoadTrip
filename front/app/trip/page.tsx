"use client";
import React from 'react'
import Sidebar from '../components/SideBar'
import Navbar from '../components/Navbar';
import {useSearchParams} from "next/navigation";
import Map from "../public/images/map-example.png";
import Image from "next/image";

const TripPage = () => {
    const searchParams = useSearchParams();

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="container mx-auto flex">
                <Sidebar tripId={searchParams.get("id")}/>
                <div className="w-full">
                    <Image
                        src={Map}
                        width={undefined}
                        height={undefined}
                        alt="finish"
                    />
                </div>
            </div>
        </div>

    )
}

export default TripPage;