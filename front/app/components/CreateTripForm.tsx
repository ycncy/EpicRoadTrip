import React from 'react';

const CreateTripForm = () => {
    return (
        <div className="bg-white w-11/12 mx-auto rounded-2xl text-black flex gap-16 p-8">
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-2xl">Où allez-vous ?</h1>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Ville de départ
                        </label>
                        <input
                            type="text" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="Marseille - France" required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Ville d'arrivée
                        </label>
                        <input
                            type="text" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="Paris - France" required
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-2xl">Quand ? (Optionnel)</h1>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Jour de départ
                        </label>
                        <input
                            type="date" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="Marseille - France" required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Jour d'arrivée
                        </label>
                        <input
                            type="date" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="Paris - France" required
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full min-h-full">
                <h1 className="font-extrabold text-2xl">Où allez-vous ?</h1>
                <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Nom de votre Road Trip
                        </label>
                        <input
                            type="text" id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5739FC] focus:border-[#5739FC] block w-full p-2.5"
                            placeholder="Paris - Marseille Juin 2025" required
                        />
                    </div>
                    <button className="w-full bg-[#5739FC] p-3 text-white rounded-xl">
                        Créer votre road-trip !
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTripForm;