import React from 'react';

const FetchTripForm = () => {
    return (
        <div className="bg-white w-11/12 mx-auto rounded-2xl text-black flex gap-16 p-8 ">
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-2xl">Rechercher un Road Trip existant</h1>
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Identifiant du Road Trip
                    </label>
                    <div className="flex">
                        <input
                            type="text" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="550e8400-e29b-41d4-a716-446655440000" required
                        />
                        <button className="bg-[#5739FC] p-3 text-white rounded-r-xl">
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FetchTripForm;