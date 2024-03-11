import React from 'react';

const Filter = ({ title, children }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg bg-[#5075c1] m-5">
            <div className="">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {children}
                </p>
            </div>
        </div>
    );
};


export default Filter;