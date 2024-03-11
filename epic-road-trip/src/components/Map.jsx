import React from 'react';

const Map = ({ title, children }) => {
    return (
        <div className="h-screen rounded shadow-lg bg-blue-500 m-5">
            <div className="">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {children}
                </p>
            </div>
        </div>
    );
};

export default Map;