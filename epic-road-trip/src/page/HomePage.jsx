import React from 'react';
import Filter from '../components/Filter';
import NavBar from '../components/NavBar';
import Background from '../assets/Background.png';

const HomePage = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center">
            <div className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: `url(${Background})`, filter: 'blur(8px)' }}></div>
            <div className="relative z-10">
                <NavBar/>
            </div>
        </div>
    );
};

export default HomePage;
