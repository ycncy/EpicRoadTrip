import React from 'react';
import Filter from '../components/Filter';
import NavBar from '../components/NavBar';
import Map from '../components/Map';

const HomePage = () => {
    return (
        <div className="grid grid-cols-[2fr_5fr] grid-flow-col">
            <Filter />
            <div className="flex flex-col h-screen">
                <NavBar />
                <Map/>
            </div>
        </div>
    );
};

export default HomePage;
