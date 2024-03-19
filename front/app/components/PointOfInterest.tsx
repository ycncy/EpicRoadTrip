"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMap } from '@fortawesome/free-solid-svg-icons';

export default function PointOfInterest() {        
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex">
    <div className="w-1/3">
      <img src="" alt="Point of Interest" className="w-full h-auto rounded-lg" />
    </div>
    <div className="ml-4 flex-grow">
    <h2 className="text-lg font-semibold mb-2">titleee  {/*{title} */}</h2>
    <h2 className="text-lg mb-2">position  {/*{Position} */}</h2>
    <div className="flex justify-end">
          <button className="px-2 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center mr-10">
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          <button className="px-2 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center">
            <FontAwesomeIcon icon={faMap} />
          </button>
        </div>
    </div>
  </div>
  

  );
}