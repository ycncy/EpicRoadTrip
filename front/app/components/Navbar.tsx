"use client";
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-6 flex justify-between items-center mx-auto px-4">
            <h1 className="text-3xl text-white">Epic Road Trip</h1>
            {/*<div className="hidden md:block">*/}
            {/*  <ul className="flex space-x-4">*/}
            {/*    <li>*/}
            {/*      <a href="/" className="text-white hover:text-gray-300">Profil</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="/" className="text-white hover:text-gray-300">Parametres</a>*/}
            {/*    </li>*/}
            {/*  */}
            {/*  </ul>*/}
            {/*</div>*/}
        </nav>
    );
};

export default Navbar;
