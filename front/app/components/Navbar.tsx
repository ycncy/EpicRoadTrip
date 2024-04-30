"use client";
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-6 flex justify-between items-center mx-auto px-4">
            <a href="/" className="text-white hover:text-gray-300">Epic Road Trip</a>
            <div className="hidden md:block">
             <ul className="flex space-x-4">
               <li>
               <a href="/savedTrips" className="text-white hover:text-gray-300">Mes Trips </a>
               </li>
               <li>
                 <h1  className="text-white hover:text-gray-300">Username
                 </h1>
               </li>
            
             </ul>

            </div>
        </nav>
    );
};

export default Navbar;
